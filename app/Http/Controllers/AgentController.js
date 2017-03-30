'use strict'

const User = use('App/Model/User')
const Role = use('App/Model/Role')
const AgentCustomer = use('App/Model/AgentCustomer')
use('App/Model/Customer')

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
    const customerId = req.param('cid')
    let agentId = req.param('aid')
    if (agentId === 'me') {
      agentId = req.currentUser._id
    }
    const agentCustomer = yield AgentCustomer.create({ agent: agentId, customer: customerId })
    res.ok(agentCustomer)
  }

  * customers (req, res) {
    let agentId = req.param('id')
    if (agentId === 'me') {
      agentId = req.currentUser._id
    }
    const agentcustomers = yield AgentCustomer.find({ agent: agentId }).populate('customer').exec()

    res.ok(agentcustomers)
  }
}

module.exports = AgentController
