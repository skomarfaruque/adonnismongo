'use strict'

const mongoose = use('Mongoose')

const discountcodeSchema = mongoose.Schema({
  discount_code: String,
  percentage: Number,
  synced: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now
  }
})

const Discountcode = mongoose.model('Discountcode', discountcodeSchema)

module.exports = Discountcode
