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

const Invoice = mongoose.model('Invoice', invoice)
module.exports = Invoice
