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
  /**
   * Search supplies by Name, description, price
   */
  * search (req, res) {
    if (req.input('key') !== '') {
      let regex = req.input('key')
      let price = parseInt(regex)
      let commission = parseInt(regex)
      if (!parseInt(regex)) {
        price = -1
        commission = -1
      }
      const supplies = yield Supplies
        .find({ $or: [{ name: regex }, { price: price }, { description: regex }, { commission: commission }] })
        .exec()
      res.ok(supplies)
    } else {
      const supplies = yield Supplies
        .find({})
        .exec()
      res.ok(supplies)
    }
  }
}

module.exports = SuppliesController
