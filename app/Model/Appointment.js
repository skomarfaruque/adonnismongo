'use strict'

const mongoose = use('Mongoose')

const scheduleSchema = mongoose.Schema({
  agent: {
    type: 'ObjectId',
    ref: 'User'
  },
  customer: {
    type: 'ObjectId',
    ref: 'Customer'
  },
  start_time: Date,
  end_time: Date,
  description: String,
  created: {
    type: Date,
    default: Date.now
  }  
})
const Appointment = mongoose.model('Appointment', scheduleSchema)
module.exports = Appointment

