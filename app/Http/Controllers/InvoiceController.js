'use strict'

const Appointment = use('App/Model/Appointment')
use('App/Model/User')
use('App/Model/Customer')


class InvoiceController {
  * index (req, res) {
    const invoices = yield Appointment.find({ invoice_settled: false }).populate('agent', 'name email').populate('customer', 'name email phone address1 address2 city state zipCode').exec()
    var scanningTotal = 0
    var suppliesArray = []
    if (invoices.length) {
      invoices.forEach(function (word, key) {
        if (word.items.length) {
          word.items.forEach(function (val, newKey) {
            if (val.description === '2 Hour Scanning' || val.description === 'Scanning 1/4 Hour') {
              scanningTotal += val.price * val.quantity
            } else {
              var priceCal = val.price * val.quantity * val.commission / 100
              var filterObj = suppliesArray.find(function (e) {
                return e.name === val.description
              })
              // console.log(filterObj)
              if (filterObj == null) {
                suppliesArray.push({name: val.description, price: priceCal})
              } else {
                filterObj.price = parseInt(filterObj.price) + parseInt(priceCal)
                // suppliesArray.push(filterObj)
              }
            }
          })
        }
      })
    }
    console.log(suppliesArray)
    res.ok({'invoices': invoices, 'scanningTotal': scanningTotal, 'othersTotal': suppliesArray})
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
