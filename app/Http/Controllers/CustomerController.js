'use strict'

const Customer = use('App/Model/Customer')

class CustomerController {

  * index (req, res) {
    const customers = yield Customer.find()
    res.send(customers)
  }

  * show (req, res) {
    const id = req.param('id')
    console.log(id)
    const customer = yield Customer.findOne({ _id: id }).exec()
    res.send(customer)
  }
  /**
   * Create Customer
   */
  * store (req, res) {
    const obj = req.only('name', 'email')
    const customer = yield Customer.create(obj)
    res.send(customer)
  }

  * update (req, res) {
    const id = req.input('id')
    const obj = req.only('name', 'email', 'address')
    const customer = yield Customer.update({ id: id }, { name: obj.name, email: obj.email, address: obj.address }).exec()
    res.send(customer)
  }

  * destroy (req, res) {
    const id = req.param('id')
    yield Customer.deleteOne({ _id: id })
    res.ok()
  }

  * import (req, res) {
    res.ok()
  }
}

module.exports = CustomerController
