'use strict'

const Supplies = use('App/Model/Supplies')

class SuppliesController {

  * index (req, res) {
    const supplies = yield Supplies.find().exec()
    res.send(supplies)
  }

  * show (req, res) {
    const id = req.param('id')
    const supplies = yield Supplies.findOne({ _id: id }).exec()
    res.send(supplies)
  }
  /**
   * Create Supply
   */
  * store (req, res) {
    const obj = req.only('name', 'price', 'description')
    let supplies = yield Supplies.findOne({ name: obj.name }).exec()
    if (!supplies) {
      supplies = yield Supplies.create(obj)
    }
    res.send(supplies)
  }

  * import (req, res) {
    res.ok()
  }

}

module.exports = SuppliesController
