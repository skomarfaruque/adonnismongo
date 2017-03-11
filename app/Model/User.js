'use strict'

/**
 *  @var Mongoose mongoose
 */
const mongoose = use('Mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
let postSchema = new Schema({
  user: ObjectId,
  name: String,
  password: String,
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', postSchema)
