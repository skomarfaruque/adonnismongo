'use strinct'
const User = use('App/Model/User')
const Role = use('App/Model/Role')
const Mail = use('Mail')
const Hash = use('Hash')
class UserController {

  * index (req, res) {
    let users = yield User.find()
    res.send(users)
  }

  * show (req, res) {
    res.send('show')
  }

  * store (req, res) {
    let obj = req.only('name', 'email', 'password')
    let user = yield User.create(obj)
    res.send(user)
  }

  * update (req, res) {
    res.send('update')
  }

  * destroy (req, res) {
    res.send('destroy')
  }

  /**
   * Authentication Related functions
   */
  * login (req, res) {
    const email = req.input('email')
    const password = req.input('password')
    const token = yield req.auth.attempt(email, password)

    if (token) {
      return res.send(token)
    }

    res.unauthorized('Invalid credentails')
  }

  * forgotPassword (req, res) {
    const email = req.input('email')
    const user = yield User.findOne({ email })
    if (!user) {
      return res.send('Email!')
    }
    let date = new Date()
    user.reset_token = yield Hash.make(date.toISOString())
    date.setDate(date.getDate() + 7)
    user.reset_exp = date
    yield user.save()
    const resetUrl = `http://localhost:3000/reset?re=${user.password_reset_token}`
    yield Mail.Raw('', {}, (message) => {
      message.to(email, email)
      message.from('no-reply@backportal.com')
      message.subject('Password Retrieval for Back Portal App')
      message.html(`Hello,<br> <p>Please visit following url to retrieve your forgotten password:</p> <br> <a href="${resetUrl}" style="font-size:20px;">Retrieve Password</a>`)
    })

    return res.send({ success: true })
  }

  * resetPassword (req, res) {
    const resetToken = req.input('re')
    const user = yield User.findOne({ reset_token: resetToken })

    if (!user) {
      return res.send('Wrong url!')
    }
    if (user.reset_exp < new Date()) {
      return res.send('Reset link expired!')
    }
    user.reset_token = ''
    user.reset_exp = null
    yield user.save()

    return res.redirect('/user/passwordreset')
  }

  * assignRole (req, res) {
    const roleName = req.input('role_name')
    const userEmail = req.input('user_email')
    const role = yield Role.findOne({ name: roleName })
    const user = yield User.findOne({ email: userEmail })
    user.role = role
    yield user.save()

    res.send(user)
  }

}

module.exports = UserController
