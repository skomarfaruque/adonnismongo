'use strict'

const mongoose = use('Mongoose')

const suppliesSchema = mongoose.Schema({
  name: String,
  description: String,
  price: String,
  commission: String,
  synced: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now
  }
})

const Supplies = mongoose.model('Supplies', suppliesSchema)

module.exports = Supplies
