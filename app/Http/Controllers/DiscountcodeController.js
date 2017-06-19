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
    let discountInfo = yield Discountcode.create(obj)
    res.send(discountInfo)
  }

  * update (req, res) {
    const id = req.param('id')
    const obj = req.only('discount_code', 'percentage')
    const discountcode = yield Discountcode.update({ _id: id }, { discount_code: obj.discount_code, percentage: obj.percentage }).exec()
    res.send(discountcode)
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
      let percentage = parseInt(regex)
      if (!parseInt(regex)) {
        percentage = -1
      }
      const discountcode = yield Discountcode
        .find({ $or: [{ discount_code: regex }, { percentage: percentage }] })
        .exec()
      res.ok(discountcode)
    } else {
      const discountcode = yield Discountcode
        .find({})
        .exec()
      res.ok(discountcode)
    }
  }
}

module.exports = DiscountcodeController
