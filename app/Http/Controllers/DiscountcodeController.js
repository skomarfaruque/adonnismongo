'use strict'

const Discountcode = use('App/Model/Discountcode')
const Helpers = use('Helpers')

class DiscountcodeController {

  * index (req, res) {
    const stores = yield Discountcode.find().exec()
    res.send(stores)
  }
  * show (req, res) {
    const id = req.param('id')
    const supplies = yield Discountcode.findOne({ _id: id }).exec()
    res.send(supplies)
  }
  /**
   * Create Supply
   */
  * store (req, res) {
    let obj = req.only('discount_code', 'percentage')
    console.log(obj)
    let discountInfo = yield Discountcode.create(obj)
    res.send(discountInfo)
  }

  * update (req, res) {
    const id = req.param('id')
    let obj = req.only('name', 'description', 'price', 'quantity', 'image', 'option')
    const image = req.file('image', {
      maxSize: '2mb',
      allowedExtensions: ['jpg', 'png', 'jpeg']
    })
    if (image.extension()) {
      const fileName = `${obj.name}_image.${image.extension()}`
      yield image.move(Helpers.publicPath('item_image'), fileName)
      obj.image = image.uploadName()
    }
    const Discountcode = yield Discountcode.update({ _id: id }, {name: obj.name, description: obj.description, price: obj.price, quantity: obj.quantity, option: obj.option, image: obj.image}).exec()
    res.send(Discountcode)
  }
  * destroy (req, res) {
    const DiscountcodeId = req.param('id')
    yield Discountcode.deleteOne({ _id: DiscountcodeId })
    yield Discountcode.remove({ Discountcode: DiscountcodeId })
    res.send('destroy')
  }

  * import (req, res) {
    res.ok()
  }
  /**
   * Search Discountcode by Name, description, price
   */
  * search (req, res) {
    if (req.input('key') !== '') {
      let regex = req.input('key')
      let price = parseInt(regex)
      if (!parseInt(regex)) {
        price = -1
      }
      const Discountcode = yield Discountcode
        .find({ $or: [{ name: regex }, { price: price }, { description: regex }] })
        .exec()
      res.ok(Discountcode)
    } else {
      const Discountcode = yield Discountcode
        .find({})
        .exec()
      res.ok(Discountcode)
    }
  }
}

module.exports = DiscountcodeController
