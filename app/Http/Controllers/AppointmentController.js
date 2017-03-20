'use strict'

const Appointment = use('App/Model/Appointment')
const User = use('App/Model/User')
const Customer = use('App/Model/Customer')

class AppointmentController {

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
