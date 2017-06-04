'use strict'

const Storeinfo = use('App/Model/Storeinfo')
const Cart = use('App/Model/Cart')
const Helpers = use('Helpers')

class StoreinfoController {

  * index (req, res) {
    const stores = yield Storeinfo.find().exec()
    res.send(stores)
  }
  * cartInfo (req, res) {
    const cartinfo = yield Cart.find({agentId: req.currentUser._id, is_paid: false}).exec()
    res.send(cartinfo)
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
  * updateItemCartModification (req, res) {
    let cartItems = []
    let originalItem = req.input('item')
    let orderQuantity = parseInt(req.input('order_quantity'))
    originalItem.order_quantity = orderQuantity
    originalItem.order_price = orderQuantity * originalItem.price
    cartItems.push(originalItem)
    const agentId = req.currentUser._id
    const itemId = req.param('id')
    const quantity = originalItem.quantity - orderQuantity
    yield Storeinfo.update({ _id: itemId }, { $set: {quantity: quantity} }).exec()
    let checkCartExists = yield Cart.findOne({agentId: agentId, is_paid: false}).exec()
    if (checkCartExists) { // unpaid cart exisits
      let checkData = checkCartExists.items.find(function (data) {
        return data._id === originalItem._id
      })
      if (checkData) {
        // remove the element
        checkCartExists.items = checkCartExists.items.filter(function (objVal) {
          return objVal._id !== originalItem._id
        })
        checkData.order_quantity += originalItem.order_quantity
        checkData.order_price += originalItem.order_price
        checkCartExists.items.push(checkData)
      } else {
        checkCartExists.items.push(originalItem)
      }
      yield Cart.update({ agentId: agentId }, { $set: {items: checkCartExists.items} }).exec()
    } else { // new insert in cart table
      let obj = {agentId: agentId, items: cartItems}
     // console.log(obj)
      yield Cart.create(obj)
    }
    res.ok('ok')
  }

  * destroy (req, res) {
    const storeinfoId = req.param('id')
    yield Storeinfo.deleteOne({ _id: storeinfoId })
    yield Storeinfo.remove({ storeinfo: storeinfoId })
    res.send('destroy')
  }

  * removecart (req, res) {
    const cartsId = req.input('id')
    const cartItems = req.input('items')
    yield Cart.update({ _id: cartsId }, { items: cartItems })

    const itemId = req.param('id')
    let orderQuantity = parseInt(req.input('order_quantity'))
    let itemInfo = yield Storeinfo.findOne({ _id: itemId }).exec()
    yield Storeinfo.update({ _id: itemId }, { $set: {quantity: orderQuantity + itemInfo.quantity} }).exec()

    // yield Cart.deleteOne({ _id: cartsId })
    res.send('remove cart item')
  }

  * payment (req, res) {
    const obj = req.only('card_no')
    const cartsId = req.input('id')
    let card = yield Cart.findOne({ _id: cartsId }).exec()
    if (!card) {
      card = yield Cart.create(obj)
    }
    res.send(card)
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
