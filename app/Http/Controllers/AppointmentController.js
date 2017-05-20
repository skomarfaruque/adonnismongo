'use strict'

const Appointment = use('App/Model/Appointment')
const User = use('App/Model/User')
const Customer = use('App/Model/Customer')
class AppointmentController {
  * show (req, res) {
    const id = req.input('id')
    const appointment = yield Appointment.findOne(id).populate('agent', 'name email').populate('customer', 'name email address1 address2 city state zipCode').exec()
    res.send(appointment)
  }
  /**
   * Fetch appointment by agent
   */
  * byAgent (req, res) {
    let agentId = req.param('id')
    if (agentId === 'me') {
      agentId = req.currentUser._id
    }
    const appointments = yield Appointment.find({ agent: agentId }).populate('agent', 'name email').populate('customer', 'name email address1 address2 city state zipCode').exec()
    res.send(appointments)
  }
  /**
   * Fetch appointment by customer
   */
  * byCustomer (req, res) {
    const customerId = req.param('id')
    const appointments = yield Appointment.find({ customer: customerId }).populate('agent', 'name email').populate('customer', 'name email address1 address2 city state zipCode').exec()
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
    const comment = req.input('comment')
    const description = req.input('description')
    const id = req.input('_id')

    const agent = yield User.findOne({ email: agentId }).exec()
    if (!agent) {
      return res.send('Agent not Found')
    }
    const customer = yield Customer.findOne({ email: customerId }).exec()
    if (!customer) {
      return res.send('Customer not Found')
    }
    let appointment
    if (id) {
     yield Appointment.update({ _id: id }, { customer, agent, start_time: start, description, comment })
     appointment = yield Appointment.findOne({ _id: id }).populate('customer').exec()
    } else {
     appointment = yield Appointment.create({ customer, agent, start_time: start, description, comment })
    }

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

  * startAppointment (req, res) {
    const id = req.input('_id')
    const start = req.input('start')
    yield Appointment.update({ _id: id }, { isStarted: true, started: start })
    res.ok('started')
  }

  * stopAppointment (req, res) {
    const id = req.input('_id')
    const end = req.input('end')
    const start = req.input('start')

    const title = 'Scanning Appointment'

    let distance = end - start
    let minutes = Math.floor(distance / (1000 * 60))
    let remaining = minutes < 1 ? 0 : minutes % 120
    let quarter = Math.ceil(remaining / 15)
    let items = [{
      description: '2 Hour Scanning',
      price: 170,
      quantity: 1
    }]

    if (quarter > 0) {
      items.push({
        description: 'Scanning 1/4 Hour',
        price: 21.25,
        quantity: quarter
      })
    }
    yield Appointment.update({ _id: id }, { ended: end, invoice_title: title, items, invoice_date: new Date(), invoice_settled: false })

    res.ok('Stopped')
  }
}

module.exports = AppointmentController
