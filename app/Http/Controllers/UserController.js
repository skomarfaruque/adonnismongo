'use strinct'
const User = use('App/Model/User')

class UserController {

  async index (req, res) {
    let user = await User.create({
      name: 'user',
      password: 'pass'
    })
    return res.send(user)
  }

  async allUsers (req, res) {
    let users = await User.find()
    return res.send(users)
  }
}

module.exports = UserController
