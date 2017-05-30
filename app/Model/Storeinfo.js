'use strict'

const mongoose = use('Mongoose')

const storeinfoSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  quantity: Number,
  image: String,
  synced: {
    type: Boolean,
    default: false
  },
  refillDate: {
    type: Date,
    default: Date.now
  },
  created: {
    type: Date,
    default: Date.now
  }
})

const Storeinfo = mongoose.model('Storeinfo', storeinfoSchema)

module.exports = Storeinfo
