'use strict'

const mongoose = use('Mongoose')

const invoice = mongoose.Schema({
  apointment: {
    type: 'ObjectId',
    ref: 'Appointment'
  },
  agent: {
    type: 'ObjectId',
    ref: 'User'
  },
  customer: {
    type: 'ObjectId',
    ref: 'Customer'
  },
  invoice_no: String,
  title: String,
  invoice_date: {
    type: Date,
    default: Date.now
  },
  comment: String,
  items: [],
  created: {
    type: Date,
    default: Date.now
  }
})
invoice.pre('save', async function (next) {
  if (this.appointment) {
    this.title = 'Scanning Appointment'
    this.agent = this.appointment.agent
    this.customer = this.appointment.customer
    let start = this.appointment.started
    let end = this.appointment.ended
    let distance = end - start
    let minutes = Math.floor(distance / (1000 * 60))
    let remaining = minutes % 120
    let quarter = Math.ceil(remaining / 15)
    this.items = [{
      description: '2 Hour Scanning',
      price: 170,
      quantity: 1
    }]

    if (quarter > 0) {
      this.items.push({
        description: 'Scanning 1/4 Hour',
        price: 21.25,
        quantity: quarter
      })
    }
  }
  return next(true)
})
const Invoice = mongoose.model('Invoice', invoice)
module.exports = Invoice
