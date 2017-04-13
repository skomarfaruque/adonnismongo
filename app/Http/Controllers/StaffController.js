'use strict'

const User = use('App/Model/User')
const Role = use('App/Model/Role')
const AgentCustomer = use('App/Model/AgentCustomer')
const BlockDay = use('App/Model/BlockDay')
use('App/Model/Customer')

class AgentController {

  * index (req, res) {
    const staffId = yield Role.findOne({ name: 'Staff' }).exec()
    const users = yield User.find({ role: staffId }).exec()
    res.send(users)
  }

  * show (req, res) {
    res.send('show')
  }

  * store (req, res) {
    let obj = req.only('name', 'email', 'password', 'addresss', 'city', 'state', 'zipcode')
    let role = yield Role.findOne({ name: 'Staff' })
    obj.role = role
    let user = yield User.create(obj)
    res.send(user)
  }

  * update (req, res) {
    res.send('update')
  }

  * destroy (req, res) {
    const staffId = req.param('id')
    yield User.deleteOne({ _id: staffId })
    res.send('destroy')
  }

  /**
   * Search Staff by Name, Zip Code, City
   */
  * search (req, res) {
    let search = req.input('key')
    search = search || ''
    const staffId = yield Role.findOne({ name: 'Staff' }).exec()
    const regex = new RegExp(search, 'i')
    const staffs = yield User
      .find()
      .and([
        { role: staffId },
        { $or: [{ name: regex }, { email: regex }, { zipCode: search }, { city: regex }] }
      ])
      .populate('role')
      .exec()

    res.ok(staffs)
  }
}

module.exports = AgentController
