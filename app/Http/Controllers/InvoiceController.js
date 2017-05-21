'use strict'

const Appointment = use('App/Model/Appointment')
use('App/Model/User')
use('App/Model/Customer')


class InvoiceController {
  * index (req, res) {
    const invoices = yield Appointment.find({ invoice_settled: false }).populate('agent', 'name email').populate('customer', 'name email phone address1 address2 city state zipCode').exec()
    if (invoices.length) {
      var firstPayment = []
      var myTotal = 0
      invoices.forEach(function (word, key) {
        if (word.items.length) {
          word.items.forEach(function (val, newKey) {
            if (val.description === '2 Hour Scanning') {
              firstPayment.push = val.price * val.quantity
              myTotal += word.newKey.price
            }
          })
        }
        console.log(myTotal)
      })
    }
    res.ok(invoices)
  }
  * show (req, res) {
    const id = req.param('id')
    const invoice = yield Appointment.findOne({ _id: id }).populate('agent', 'name email').populate('customer', 'name email phone address1 address2 city state zipCode').exec()
    res.ok(invoice)
  }
  * getByAgent (req, res) {
    const agentId = req.param('agent')
    const invoices = yield Appointment.find({ agent: agentId }).populate('agent', 'name email').populate('customer', 'name email phone address1 address2 city state zipCode').exec()
    res.ok(invoices)
  }
  * addItem (req, res) {
    const items = req.input('items')
    const id = req.input('id')
    yield Appointment.update({ _id: id }, { items }).exec()
  }
}

module.exports = InvoiceController
