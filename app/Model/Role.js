'use strict'

const mongoose = use('Mongoose')

const roleSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  permissions: [String],
  created: {
    type: Date,
    default: Date.now
  }
})

const Role = mongoose.model('Role', roleSchema)
Role.ensureIndexes()

module.exports = Role
