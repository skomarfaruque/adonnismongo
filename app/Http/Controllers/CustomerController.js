'use strict'

const Customer = use('App/Model/Customer')
const AgentCustomer = use('App/Model/AgentCustomer')
const Appointment = use('App/Model/Appointment')

class CustomerController {

  * index (req, res) {
    const customers = yield Customer.find().exec()
    res.send(customers)
  }

  * show (req, res) {
    const id = req.param('id')
    const customer = yield Customer.findOne({ _id: id }).exec()
    res.send(customer)
  }
  /**
   * Create Customer
   */
  * store (req, res) {
    const obj = req.only('name', 'email', 'phone', 'address1', 'address2', 'city', 'zipCode', 'state')
    const customer = yield Customer.create(obj)
    res.send(customer)
  }

  * update (req, res) {
    const id = req.param('id')
    const obj = req.only('name', 'phone', 'address1', 'address2', 'city', 'zipCode', 'state')
    const customer = yield Customer.update({ _id: id }, { name: obj.name, email: obj.email, address: obj.address }).exec()
    res.send(customer)
  }

  * destroy (req, res) {
    const id = req.param('id')
    yield Customer.deleteOne({ _id: id })
    yield AgentCustomer.remove({ customer: id })
    yield Appointment.remove({ customer: id })
    res.ok()
  }

  * import (req, res) {
    res.ok()
  }
}

module.exports = CustomerController
