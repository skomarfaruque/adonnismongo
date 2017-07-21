'use strict'

const mongoose = use('Mongoose')

const cartSchema = mongoose.Schema({
  agentId: String,
  items: [{
    _id: String,
    order_quantity: Number,
    order_price: Number,
    price: Number,
    optionVal: String,
    image: String,
    name: String,
    description: String
  }],
  payment: [],
  is_paid: {
    type: Boolean,
    default: false
  },
  paymentDate: {
    type: Date
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
