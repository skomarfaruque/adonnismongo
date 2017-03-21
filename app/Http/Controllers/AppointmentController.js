'use strict'

const Appointment = use('App/Model/Appointment')
const User = use('App/Model/User')
const Customer = use('App/Model/Customer')

class AppointmentController {

  * show (req, res) {
    const id = req.input('id')
    const appointment = yield Appointment.findOne(id)
    res.send(appointment)
  }
  /**
   * Fetch appointment by agent
   */
  * byAgent (req, res) {
    const agentId = req.input('agent')
    const appointments = yield Appointment.find({ agent: agentId })
    res.ok(appointments)
  }
  /**
   * Fetch appointment by customer
   */
  * byCustomer (req, res) {
    const customerId = req.input('customer')
    const appointments = yield Appointment.find({ customer: customerId })
    res.ok(appointments)
  }

  /**
   * Save appointment for agent
   * @param {customer} customer email
   * @param {agent} agent email
   */
  * store (req, res) {
    const customerId = req.input('customer')
    const agentId = req.input('agent')
    const start = req.input('start_time')
    const description = req.input('description')
    const agent = yield User.findOne({ email: agentId })
    const customer = yield Customer.findOne({ email: customerId })
    const appointment = yield Appointment.create({ customer, agent, start_time: start, description })
    res.ok(appointment)
  }
}

module.exports = AppointmentController
