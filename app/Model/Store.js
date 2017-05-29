'use strict'

const mongoose = use('Mongoose')

const StoreSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  quantity: Number,
  image: String,
  refillDate: {
    type: Date,
    default: Date.now
  },
  created: {
    type: Date,
    default: Date.now
  }
})

const Store = mongoose.model('Store', StoreSchema)

module.exports = Store
