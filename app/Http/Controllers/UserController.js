'use strict'
const User = use('App/Model/User')
const Role = use('App/Model/Role')
const Mail = use('Mail')
const Hash = use('Hash')
const Env = use('Env')
class UserController {

  * index (req, res) {
    let users = yield User.find()
    res.send(users)
  }

  * show (req, res) {
    let userId = req.param('id')
    if (userId === 'me') {
      userId = req.currentUser._id
    }
    const user = yield User.findOne({ _id: userId }).exec()
    return res.ok(user)
  }

  * store (req, res) {
    let obj = req.only('name', 'email', 'password')
    let user = yield User.create(obj)
    res.send(user)
  }

  * update (req, res) {
    const userId = req.param('id')
    const obj = req.only('name', 'email', 'phone', 'address', 'city', 'state', 'zipCode', 'block_time')
    let user = yield User.update({ _id: userId }, { name: obj.name, email: obj.email, phone: obj.phone, address: obj.address, city: obj.city, state: obj.state, zipCode: obj.zipCode, block_time: obj.block_time })
    res.send(user.name)
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
      let user = yield User.findOne({ email }).populate('role', 'name permissions').exec()
      return res.send({ token, role: user.role.name, permissions: user.role.permissions })
    }

    res.unauthorized('Invalid credentails')
  }
  /**
   * Send invitation by staff or another angent to add another agent
   */
  * sendInvitation (req, res) {
    const name = req.input('name')
    const email = req.input('email')
    const userRole = req.input('role')

    const resetToken = yield Hash.make(email)
    const role = yield Role.findOne({ name: userRole })
    const user = yield User.create({ name: name, email: email, reset_token: resetToken, role: role })

    const resetUrl = `http://${Env.get('DOMAIN')}:${Env.get('PORT')}/signup/confirmation?token=${user.reset_token}`
    yield Mail.raw('', message => {
      message.to(email, email)
      message.from('no-reply@backportal.com')
      message.subject('Email Confirmation for Back Portal App')
      message.html(`Hello,<br> <p>Please visit following url to join the Back Portal:</p> <br> <a href="${resetUrl}"  style="font-size:20px;">${resetUrl}</a>`)
    })
    res.ok(resetUrl)
  }
  /**
   * When user get email confirmation they will come the confirmation
   * page and send token and password to this API
  */
  * signupConfirm (req, res) {
    const token = req.input('token')
    const password = req.input('password')
    const user = yield User.findOne({ reset_token: token })
    if (!user) {
      res.send({ success: false, message: 'Email account not found' })
    }
    if (!user.password || user.password.length === 0) {
      user.password = password
    }
    user.reset_token = ''
    user.email_confirmed = true

    user.save()
    res.send({ success: true, message: 'User Signup successfull' })
  }
  /**
   * Send forget password request to the users email account
   */
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
    const resetUrl = `http://${Env.get('DOMAIN')}:${Env.get('PORT')}/reset?re=${user.reset_token}`
    yield Mail.raw('', message => {
      message.to(email, email)
      message.from('no-reply@backportal.com')
      message.subject('Password Retrieval for Back Portal App')
      message.html(`Hello,<br> <p>Please visit following url to retrieve your forgotten password:</p> <br> <a href="${resetUrl}"  style="font-size:20px;">${resetUrl}</a>`)
    })

    return res.send({ success: true })
  }
  /**
   * Password Reset for user
   */
  * resetPassword (req, res) {
    const resetToken = req.input('re')
    const newPassword = req.input('password')
    const user = yield User.findOne({ reset_token: resetToken })

    if (!user) {
      return res.send('Wrong url!')
    }
    if (user.reset_exp < new Date()) {
      return res.send('Reset link expired!')
    }
    user.password = newPassword
    user.reset_token = ''
    user.reset_exp = null
    yield user.save()

    return res.send({ success: true })
  }
  /**
   * Assign a role to the user
   */
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
