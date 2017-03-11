'use strict'

/**
 *  @var Mongoose mongoose
 */
const mongoose = use('Mongoose')
const Hash = use('Hash')
let user = mongoose.Schema({
  user: {
    type: 'ObjectId'
  },
  name: String,
  password: String,
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
