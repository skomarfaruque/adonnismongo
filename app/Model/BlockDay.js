'use strict'

const mongoose = use('Mongoose')

const blockDay = mongoose.Schema({
  agent: {
    type: 'ObjectId',
    ref: 'Agent'
  },
  blockDate: Date
})

const BlockDay = mongoose.model('BlockDay', blockDay)

module.exports = BlockDay
