'use strinct'
const User = use('App/Model/User')

class UserController {

  * index (req, res) {
    let user = yield User.create({
      name: 'user',
      password: 'pass'
    })
    res.send(user)
  }

  * allUsers (req, res) {
    let users = yield User.find()
    res.send(users)
  }
}

module.exports = UserController
