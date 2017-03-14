'use strict'

/**
 *  @var Mongoose mongoose
 */
const mongoose = use('Mongoose')
const Hash = use('Hash')
let user = mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  role: {
    type: 'ObjectId',
    ref: 'Role'
  },
  created: {
    type: Date,
    default: Date.now
  }
})

user.pre('save', async function (next) {
  this.password = await Hash.make(this.password)
  return next(true)
})

module.exports = mongoose.model('User', user)
