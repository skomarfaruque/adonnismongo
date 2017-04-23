'use strict'

const mongoose = use('Mongoose')

const blockDay = mongoose.Schema({
  agent: {
    type: 'ObjectId',
    ref: 'Agent'
  },
  blockDate: Date,
  start: String,
  end: String,
  fullday: Boolean,
  isRepeat: Boolean,
  comment: String
})

const BlockDay = mongoose.model('BlockDay', blockDay)

module.exports = BlockDay
