'use strict'

const mongoose = use('Mongoose')

const agentCustomer = mongoose.Schema({
  agent: {
    type: 'ObjectId',
    ref: 'Agent'
  },
  customer: {
    type: 'ObjectId',
    ref: 'Customer'
  }
})

const AgentCustomer = mongoose.model('AgentCustomer', agentCustomer)

module.exports = AgentCustomer
