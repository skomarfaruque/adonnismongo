'use strinct'
const User = use('App/Model/User')
const Role = use('App/Model/Role')

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
      yield req.session.put('token', token)
      return res.send(token)
    }

    res.unauthorized('Invalid credentails')
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
