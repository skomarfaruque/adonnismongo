'use strict'

const mongoose = use('Mongoose')

const supplySchema = mongoose.Schema({
  name: String,
  description: String,
  price: String,
  synced: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now
  }
})

const Supply = mongoose.model('Supply', supplySchema)

module.exports = Supply
