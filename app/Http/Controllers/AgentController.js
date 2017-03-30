'use strict'

const User = use('App/Model/User')
const Role = use('App/Model/Role')
const AgentCustomer = use('App/Model/AgentCustomer')

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

  * assignCustomer (req, res) {
    const customer = req.input('customer')
    const agent = req.currentUser._id
    yield AgentCustomer.create({ agent: agent, customer: customer })
    res.ok()
  }
}

module.exports = AgentController
