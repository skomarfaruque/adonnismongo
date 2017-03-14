'use strict'

/**
 *  @var Mongoose mongoose
 */
const mongoose = use('Mongoose')
const Hash = use('Hash')
const userSchema = mongoose.Schema({
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

userSchema.pre('save', async function (next) {
  this.password = await Hash.make(this.password)
  return next(true)
})

const User = mongoose.model('User', userSchema)
User.ensureIndexes()

module.exports = User
