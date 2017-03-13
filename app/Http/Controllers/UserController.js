'use strinct'
const User = use('App/Model/User')

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
      res.send(token)
    }

    res.unauthorized('Invalid credentails')
  }

}

module.exports = UserController
