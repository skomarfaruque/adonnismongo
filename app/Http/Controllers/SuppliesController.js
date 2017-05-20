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
    const obj = req.only('name', 'price', 'description', 'commission')
    let supplies = yield Supplies.findOne({ name: obj.name }).exec()
    if (!supplies) {
      supplies = yield Supplies.create(obj)
    }
    res.send(supplies)
  }

  * update (req, res) {
    const id = req.param('id')
    const obj = req.only('name', 'description', 'price', 'commission')
    const supplies = yield Supplies.update({ _id: id }, { name: obj.name, description: obj.description, price: obj.price, commission: obj.commission }).exec()
    res.send(supplies)
  }

  * destroy (req, res) {
    const suppliesId = req.param('id')
    yield Supplies.deleteOne({ _id: suppliesId })
    yield Supplies.remove({ supplies: suppliesId })
    res.send('destroy')
  }

  * import (req, res) {
    res.ok()
  }

}

module.exports = SuppliesController
