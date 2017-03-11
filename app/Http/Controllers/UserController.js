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
}

module.exports = UserController
