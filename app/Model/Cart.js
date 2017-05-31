'use strict'

const mongoose = use('Mongoose')

const cartSchema = mongoose.Schema({
  item: String,
  quantity: String,
  created: {
    type: Date,
    default: Date.now
  }
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
