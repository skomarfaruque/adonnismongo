'use strict'

const Storeinfo = use('App/Model/Storeinfo')

class StoreinfoController {

  * index (req, res) {
    const stores = yield Storeinfo.find().exec()
    res.send(stores)
  }

  * show (req, res) {
    const id = req.param('id')
    const supplies = yield Storeinfo.findOne({ _id: id }).exec()
    res.send(supplies)
  }
  /**
   * Create Supply
   */
  * store (req, res) {
    const obj = req.only('name', 'price', 'description', 'quantity')
    let storeinfo = yield Storeinfo.findOne({ name: obj.name }).exec()
    if (!storeinfo) {
      storeinfo = yield Storeinfo.create(obj)
    }
    res.send(storeinfo)
  }

  * update (req, res) {
    const id = req.param('id')
    const obj = req.only('name', 'description', 'price', 'quantity')
    const supplies = yield Storeinfo.update({ _id: id }, { name: obj.name, description: obj.description, price: obj.price, commission: obj.commission }).exec()
    res.send(supplies)
  }

  * destroy (req, res) {
    const suppliesId = req.param('id')
    yield Storeinfo.deleteOne({ _id: suppliesId })
    yield Storeinfo.remove({ supplies: suppliesId })
    res.send('destroy')
  }

  * import (req, res) {
    res.ok()
  }
  /**
   * Search supplies by Name, description, price
   */
  * search (req, res) {
    if(req.input('key') != '') {
      let regex = req.input('key')
      const supplies = yield Storeinfo
        .find({ $or: [{ name: regex }, { price: regex }, { description: regex }, { commission: regex }] })
        .exec()

      res.ok(supplies)
      console.log(supplies)
    }
  }
}

module.exports = StoreinfoController
