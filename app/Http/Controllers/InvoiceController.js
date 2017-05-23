'use strict'
const moment = require('moment')
const _ = require('lodash')
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
      var date = moment().subtract(i, 'week').startOf('week').toDate()
      var datePrevious = moment().subtract(i + 1, 'week').startOf('week').toDate()
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
    const invoices = yield Appointment.find({invoice_settled: false, agent: userId, invoice_date: {$gte: lastYear, $lt: today}}).exec()
    var weeks = []
    var year = {}
    year.item = {}
    year.totalPrice = 0
    if (invoices.length) {
      invoices.forEach(function (invoiceVal, key) {
        if (invoiceVal.items.length) {
          invoiceVal.items.forEach(function (supplyVal, newKey) {
            let price = supplyVal.price * supplyVal.quantity * supplyVal.commission / 100
            year.totalPrice += price
            if (!year.item[supplyVal.description]) {
              year.item[supplyVal.description] = 0
            }
            year.item[supplyVal.description] += price
          })
        }
      })
    }
    for (var i = 0; i < 4; i++) {
      var weekData = {}
      weekData.item = {}
      var date = moment().subtract(i, 'week').startOf('week').toDate()
      var datePrevious = moment().subtract(i + 1, 'week').startOf('week').toDate()
      weekData.date = moment(date).format('MMMM Do YYYY')
      weekData.totalPrice = 0
      if (invoices.length) {
        invoices.forEach(function (invoiceVal, key) {
          // if (datePrevious <= invoiceVal.invoice_date && invoiceVal.invoice_date < date) {
          if (datePrevious) {
            if (invoiceVal.items.length) {
              invoiceVal.items.forEach(function (supplyVal, newKey) {
                let price = supplyVal.price * supplyVal.quantity * supplyVal.commission / 100
                weekData.totalPrice += price
                if (!weekData.item[supplyVal.description]) {
                  weekData.item[supplyVal.description] = 0
                }
                weekData.item[supplyVal.description] += price
              })
            }
          }
        })
      }
      // console.log(year)
      weeks.push(weekData)
    }
    console.log(weeks)
    res.send({year: year, weeks: weeks})
  }
  * addItem (req, res) {
    const items = req.input('items')
    const id = req.input('id')
    yield Appointment.update({ _id: id }, { items }).exec()
  }
  * payment (req, res) {
    const paymentType = req.input('paymentType')
    const id = req.input('id')
    yield Appointment.update({ _id: id }, { $set: { invoice_date: new Date() } }).exec()
    console.log(paymentType)
  }

}

module.exports = InvoiceController
