'use strict'

const mongoose = use('Mongoose')

const roleSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  permissions: [String],
  users: [{
    type: 'ObjectId',
    ref: 'User'
  }],
  created: {
    type: Date,
    default: Date.now
  }
})

const Role = mongoose.model('Role', roleSchema)
Role.ensureIndexes()

module.exports = Role
