'use strict'

const mongoose = use('Mongoose')

let role = mongoose.Schema({
  name: String,
  permissions: [String],
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Role', role)
