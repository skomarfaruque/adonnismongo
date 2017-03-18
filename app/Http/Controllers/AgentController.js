'use strict'

const User = use('App/Model/User')
const Role = use('App/Model/Role')

class AgentController {

  * index (req, res) {
    let users = yield User.find({ 'role.name': 'Agent' })
    res.send(users)
  }

  * show (req, res) {
    res.send('show')
  }

  * store (req, res) {
    let obj = req.only('name', 'email', 'password', 'addresss', 'city', 'state', 'zipcode')
    let role = yield Role.findOne({ name: 'Agent' })
    obj.role = role
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

module.exports = AgentController
