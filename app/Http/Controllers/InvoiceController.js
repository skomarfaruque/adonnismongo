'use strict'
var moment = require('moment');
const Appointment = use('App/Model/Appointment')
use('App/Model/User')
use('App/Model/Customer')


class InvoiceController {
  * index (req, res) {
    let userId = req.param('id')
    if (userId === 'me') {
      userId = req.currentUser._id
    }
    const invoices = yield Appointment.find({ invoice_settled: false, agent: userId }).populate('agent', 'name email').populate('customer', 'name email phone address1 address2 city state zipCode').exec()
    var weeks = []
    for (var i = 0; i < 4; i++) {
      var weekData = {}
      weekData.items = []
      var date = moment().subtract(i, 'week').startOf('isoWeek').toDate()
      var datePrevious = moment().subtract(i + 1, 'week').startOf('isoWeek').toDate()
      weekData.date = date
      if (invoices.length) {
        invoices.forEach(function (invoiceVal, key) {
          if (datePrevious <= invoiceVal.invoice_date && invoiceVal.invoice_date < date) {
            if (invoiceVal.items.length) {
              invoiceVal.items.forEach(function (supplyVal, newKey) {
                var pushData = {}
                pushData.name = supplyVal.description
                pushData.price = supplyVal.price * supplyVal.quantity * supplyVal.commission / 100
                weekData.items.push(pushData)
              })
            }
          }
        })
      }
      weeks.push(weekData)
    }
    console.log(weeks)
    res.ok(invoices)
  }
  * show (req, res) {
    const id = req.param('id')
    const invoice = yield Appointment.findOne({ _id: id }).populate('agent', 'name email').populate('customer', 'name email phone address1 address2 city state zipCode').exec()
    res.ok(invoice)
  }
  * getByAgent (req, res) {
    var lastYear = moment().subtract(1,'year').toDate()
    var today = moment().toDate()
    let userId = req.param('id')
    if (userId === 'me') {
      userId = req.currentUser._id
    }
    const invoices = yield Appointment.find({invoice_settled: false, agent: userId, invoice_date: {$gte: lastYear, $lt: today}}).populate('agent', 'name email').populate('customer', 'name email phone address1 address2 city state zipCode').exec()
    var weeks = []
    for (var i = 0; i < 4; i++) {
      var weekData = {}
      weekData.items = []
      var date = moment().subtract(i, 'week').startOf('isoWeek').toDate()
      var datePrevious = moment().subtract(i + 1, 'week').startOf('isoWeek').toDate()
      weekData.date = date
      if (invoices.length) {
        invoices.forEach(function (invoiceVal, key) {
          if (datePrevious <= invoiceVal.invoice_date && invoiceVal.invoice_date < date) {
            if (invoiceVal.items.length) {
              invoiceVal.items.forEach(function (supplyVal, newKey) {
                var pushData = {}
                pushData.name = supplyVal.description
                pushData.price = supplyVal.price * supplyVal.quantity * supplyVal.commission / 100
                weekData.items.push(pushData)
              })
            }
          }
        })
      }
      weeks.push(weekData)
    }
    console.log(weeks)
    res.ok(invoices)
  }
  * addItem (req, res) {
    const items = req.input('items')
    const id = req.input('id')
    yield Appointment.update({ _id: id }, { items }).exec()
  }
}

module.exports = InvoiceController
