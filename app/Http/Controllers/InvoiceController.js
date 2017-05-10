'use strict'

use('App/Model/Appointment')
use('App/Model/User')
use('App/Model/Customer')
const Invoice = use('App/Model/Invoice')

class InvoiceController {
  * index (req, res) {
    const invoices = yield Invoice.find().populate('agent', 'name email').populate('customer', 'name email phone address1 address2 city state zipCode').exec()
    res.ok(invoices)
  }
  * show (req, res) {
    const id = req.param('id')
    const invoice = yield Invoice.findOne({ _id: id }).populate('agent', 'name email').populate('customer', 'name email phone address1 address2 city state zipCode').exec()
    res.ok(invoice)
  }
  * getByAgent (req, res) {
    const agentId = req.param('agent')
    const invoices = yield Invoice.find({ agent: agentId }).populate('agent', 'name email').populate('customer', 'name email phone address1 address2 city state zipCode').exec()
    res.ok(invoices)
  }
  * addItem (req, res) {
    const items = req.input('items')
    const id = req.input('id')
    yield Invoice.update({ _id: id }, { items }).exec()
  }
}

module.exports = InvoiceController
