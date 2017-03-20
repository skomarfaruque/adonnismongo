'use strict'

const Customer = use('App/Model/Customer')

class CustomerController {
  /**
   * Create Customer
   */
  * store (req, res) {
    const obj = req.only('name', 'email')
    const customer = yield Customer.create(obj)
    res.send(customer)
  }

  * import (req, res) {
    res.ok()
  }
}

module.exports = CustomerController
