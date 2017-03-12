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
    let obj = req.only('name', 'password')
    let user = yield User.create(obj)
    res.send(user)
  }

  * update (req, res) {
    res.send('update')
  }

  * destroy (req, res) {
    res.send('destroy')
  }
}

module.exports = UserController
