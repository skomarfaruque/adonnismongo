'use strict'

const Storeinfo = use('App/Model/Storeinfo')
const Cart = use('App/Model/Cart')
const Helpers = use('Helpers')

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
    const name = req.input('name')
    const description = req.input('description')
    const price = req.input('price')
    const quantity = req.input('quantity')
    const image = req.file('image', {
      maxSize: '2mb',
      allowedExtensions: ['jpg', 'png', 'jpeg']
    })
    const fileName = `${name}_back.${image.extension()}`
    yield image.move(Helpers.publicPath('item_image'), fileName)
    const obj = {name: name, description: description, price: price, quantity: quantity, image: image.uploadName()}
    let storeinfo = yield Storeinfo.create(obj)
    res.send(storeinfo)
  }

  * update (req, res) {
    const id = req.param('id')
    let obj = req.only('name', 'description', 'price', 'quantity', 'image')
    const image = req.file('image', {
      maxSize: '2mb',
      allowedExtensions: ['jpg', 'png', 'jpeg']
    })
    if (image.extension()) {
      const fileName = `${obj.name}_image.${image.extension()}`
      yield image.move(Helpers.publicPath('item_image'), fileName)
      obj.image = image.uploadName()
    }
    const storeinfo = yield Storeinfo.update({ _id: id }, {name: obj.name, description: obj.description, price: obj.price, quantity: obj.quantity, image: obj.image}).exec()
    res.send(storeinfo)
  }
  * updateItem (req, res) {
    const agentId = req.currentUser._id
    const itemId = req.param('id')
    const quantity = req.input('quantity') - req.input('quantity_temp')
    yield Storeinfo.update({ _id: itemId }, { $set: {quantity: quantity} }).exec()
    let obj = {agentId: agentId, item: itemId, quantity: req.input('quantity_temp')}
    yield Cart.create(obj)
    res.ok('ok')
  }

  * destroy (req, res) {
    const storeinfoId = req.param('id')
    yield Storeinfo.deleteOne({ _id: storeinfoId })
    yield Storeinfo.remove({ storeinfo: storeinfoId })
    res.send('destroy')
  }

  * import (req, res) {
    res.ok()
  }
  /**
   * Search storeinfo by Name, description, price
   */
  * search (req, res) {
    if (req.input('key') != '') {
      let regex = req.input('key')
      const storeinfo = yield Storeinfo
        .find({ $or: [{ name: regex }, { price: regex }, { description: regex }] })
        .exec()

      res.ok(storeinfo)
      console.log(storeinfo)
    }
  }
}

module.exports = StoreinfoController
