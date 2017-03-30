'use strict'

const Appointment = use('App/Model/Appointment')
const User = use('App/Model/User')
const Customer = use('App/Model/Customer')
class AppointmentController {
  * show (req, res) {
    const id = req.input('id')
    const appointment = yield Appointment.findOne(id).populate('agent', 'name email').populate('customer', 'name email').exec()
    res.send(appointment)
  }
  /**
   * Fetch appointment by agent
   */
  * byAgent (req, res) {
    const agentId = req.param('id')
    const appointments = yield Appointment.find({ agent: agentId }).populate('agent', 'name email').populate('customer', 'name email').exec()
    res.send(appointments)
  }
  /**
   * Fetch appointment by customer
   */
  * byCustomer (req, res) {
    const customerId = req.param('id')
    const appointments = yield Appointment.find({ customer: customerId }).populate('agent', 'name email').populate('customer', 'name email').exec()
    res.send(appointments)
  }

  /**
   * Save appointment for agent
   * @param {customer} customer email
   * @param {agent} agent email
   */
  * store (req, res) {
    const customerId = req.input('customer')
    const agentId = req.input('agent')
    const start = req.input('start')
    const description = req.input('description')
    const agent = yield User.findOne({ email: agentId }).exec()
    if (!agent) {
      return res.send('Agent not Found')
    }
    const customer = yield Customer.findOne({ email: customerId }).exec()
    if (!customer) {
      return res.send('Customer not Found')
    }
    const appointment = yield Appointment.create({ customer, agent, start_time: start, description })
    res.send(appointment)
  }

  /**
   * Delete a appointment
   */
  * destroy (req, res) {
    const id = req.param('id')
    try {
      yield Appointment.deleteOne({ _id: id })
      res.ok()
    } catch (e) {
      res.send(e)
    }
  }
}

module.exports = AppointmentController
