'use strict'

const Store = use('App/Model/Store')

class StoreController {

  * index (req, res) {
    const Store = yield Store.find().exec()
    res.send(Store)
  }

  * show (req, res) {
    const id = req.param('id')
    const Store = yield Store.findOne({ _id: id }).exec()
    res.send(Store)
  }
  /**
   * Create Supply
   */
  * store (req, res) {
    const obj = req.only('name', 'price', 'description', 'commission')
    let Store = yield Store.findOne({ name: obj.name }).exec()
    if (!Store) {
      Store = yield Store.create(obj)
    }
    res.send(Store)
  }

  * update (req, res) {
    const id = req.param('id')
    const obj = req.only('name', 'description', 'price', 'commission')
    const Store = yield Store.update({ _id: id }, { name: obj.name, description: obj.description, price: obj.price, commission: obj.commission }).exec()
    res.send(Store)
  }

  * destroy (req, res) {
    const StoreId = req.param('id')
    yield Store.deleteOne({ _id: StoreId })
    yield Store.remove({ Store: StoreId })
    res.send('destroy')
  }

  * import (req, res) {
    res.ok()
  }
  /**
   * Search Store by Name, description, price
   */
  * search (req, res) {
    if(req.input('key') != '') {
      let regex = req.input('key')
      const Store = yield Store
        .find({ $or: [{ name: regex }, { price: regex }, { description: regex }, { commission: regex }] })
        .exec()

      res.ok(Store)
      console.log(Store)
    }
  }
}

module.exports = StoreController
