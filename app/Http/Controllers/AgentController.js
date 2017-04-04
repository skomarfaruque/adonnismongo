'use strict'

const User = use('App/Model/User')
const Role = use('App/Model/Role')
const AgentCustomer = use('App/Model/AgentCustomer')
use('App/Model/Customer')

class AgentController {

  * index (req, res) {
    const agentId = yield Role.findOne({ name: 'Agent' }).exec()
    const users = yield User.find({ role: agentId }).exec()
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
    const agentId = req.param('id')
    yield User.deleteOne({ _id: agentId })
    yield AgentCustomer.remove({ agent: agentId })
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
    const customers = agentcustomers.map((m) => {
      return {
        _id: m.customer._id,
        name: m.customer.name,
        email: m.customer.email,
        phone: m.customer.phone,
        zipCode: m.customer.zipCode,
        state: m.customer.state,
        city: m.customer.city
      }
    })
    res.ok(customers)
  }

  /**
   * Search Agent by Name, Zip Code, City
   */
  * search (req, res) {
    let search = req.input('key')
    search = search || ''
    const agentId = yield Role.findOne({ name: 'Agent' }).exec()
    const agents = yield User
      .find()
      .and([
        { role: agentId },
        { $or: [{ name: new RegExp(search, 'i') }, { email: new RegExp(search, 'i') }, { zipCode: search }, { city: new RegExp(search, 'i') }] }
      ])
      .populate('role')
      .exec()

    res.ok(agents)
  }
}

module.exports = AgentController
