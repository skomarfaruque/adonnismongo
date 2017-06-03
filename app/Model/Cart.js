'use strict'

const mongoose = use('Mongoose')

const cartSchema = mongoose.Schema({
  agentId: String,
  items: [],
  payment: [],
  is_paid: {
    type: Boolean,
    default: false
  },
  is_delivered: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now
  }
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
