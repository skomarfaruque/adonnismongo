'use strict'

const User = use('App/Model/User')
const Role = use('App/Model/Role')
const AgentCustomer = use('App/Model/AgentCustomer')
const BlockDay = use('App/Model/BlockDay')
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

  * addBlockDay (req, res) {
    const agentId = req.param('id')
    let date = req.only('blockDate', 'fullday', 'start', 'end', 'isRepeat', 'comment')
    date.agent = agentId
    yield BlockDay.deleteOne({ agent: agentId, blockDate: date.blockDate })
    const blockDay = yield BlockDay.create(date)
    res.ok(blockDay)
  }
  * getBlockDays (req, res) {
    const agentId = req.param('id')
    const blockDay = yield BlockDay.find({ agent: agentId }).exec()
    res.ok(blockDay)
  }
  * removeBlockDay (req, res) {
    const agentId = req.param('id')
    const date = req.param('date')
    yield BlockDay.deleteOne({ agent: agentId, blockDate: date })
    res.ok('Block Day Deleted')
  }

  * assignCustomer (req, res) {
    const customerId = req.param('cid')
    let agentId = req.param('aid')
    if (agentId === 'me') {
      agentId = req.currentUser._id
    }
    yield AgentCustomer.deleteOne({ agent: agentId, customer: customerId })
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
    const regex = new RegExp(search, 'i')
    const agents = yield User
      .find()
      .and([
        { role: agentId },
        { $or: [{ name: regex }, { email: regex }, { zipCode: search }, { city: regex }] }
      ])
      .populate('role')
      .exec()

    res.ok(agents)
  }
}

module.exports = AgentController
