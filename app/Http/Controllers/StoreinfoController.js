'use strict'
var ApiContracts = require('authorizenet').APIContracts
var ApiControllers = require('authorizenet').APIControllers
const Storeinfo = use('App/Model/Storeinfo')
const Cart = use('App/Model/Cart')
const Helpers = use('Helpers')

class StoreinfoController {

  * index (req, res) {
    const stores = yield Storeinfo.find().exec()
    res.send(stores)
  }
  * cartInfo (req, res) {
    const cartinfo = yield Cart.findOne({agentId: req.currentUser._id, is_paid: false}).exec()
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
    const option = req.input('option')
    const image = req.file('image', {
      maxSize: '2mb',
      allowedExtensions: ['jpg', 'png', 'jpeg']
    })
    var uniqueId = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36)
    const fileName = `${uniqueId}_item_${name}.${image.extension()}`
    yield image.move(Helpers.publicPath('item_image'), fileName)
    const obj = {name: name, description: description, price: price, quantity: quantity, option: option, image: image.uploadName()}
    let storeinfo = yield Storeinfo.create(obj)
    res.send(storeinfo)
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
    const storeinfo = yield Storeinfo.update({ _id: id }, {name: obj.name, description: obj.description, price: obj.price, quantity: obj.quantity, option: obj.option, image: obj.image}).exec()
    res.send(storeinfo)
  }

  * updateCart (req, res) {
    const itemId = req.param('id')
    let items = req.input('items')
    const cartInfo = yield Cart.update({ _id: itemId }, { $set: { items: items } }).exec()
    res.send(cartInfo)
  }

  * updateItemCartModification (req, res) {
    var resultInfo
    let cartItems = []
    let originalItem = req.input('item')
    if (!originalItem.optionVal) {
      originalItem.optionVal = ''
    }
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
        return data._id === originalItem._id && data.optionVal === originalItem.optionVal
      })
      if (checkData) {
        checkCartExists.items = checkCartExists.items.filter(function (objVal) {
          return objVal.optionVal !== originalItem.optionVal && objVal._id !== originalItem._id
        })
        checkData.order_quantity += originalItem.order_quantity
        checkData.order_price += originalItem.order_price
        
        checkCartExists.items.push(checkData)
      } else {
        checkCartExists.items.push(originalItem)
      }
      resultInfo = yield Cart.update({ agentId: agentId }, { $set: {items: checkCartExists.items} }).exec()
    } else { // new insert in cart table
      let obj = {agentId: agentId, items: cartItems}
      resultInfo = yield Cart.create(obj)
    }
    res.send(resultInfo)
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

  // * payment (req, res) {
  //   // const obj = req.only('card_no', 'tax','exp_date','ship_first_name', 'ship_last_name','ship_company','ship_address','ship_city','ship_state', 'ship_zip', 'ship_country','card_code', 'bill_first_name','bill_last_name','bill_company','bill_address','bill_city','bill_state','bill_zip','bill_country')
  //   const cartsId = req.input('id')
  //   let card = yield Cart.findOne({ _id: cartsId }).exec()
  //   if (!card) {
  //     card = yield Cart.create(obj)
  //   }
  //   res.send(card)
  // }

  * payment (req, res) {
    const cartsId = req.input('id')
    const card = req.input('card')
    const date = new Date()
    let invoiceInfo = {description: 'Item has been purchased successfully.'}
    return yield this.newFunc(res, invoiceInfo, cartsId, card, date)
  }
  * newFunc (res, invoiceInfo, cartsId, card, date) {
    var errorInfo = 'no'
    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType()
    merchantAuthenticationType.setName('3x2uZZ6s')
    merchantAuthenticationType.setTransactionKey('79p7Ax97XLe7hLf2')

    var creditCard = new ApiContracts.CreditCardType()
    // creditCard.setCardNumber('4012888818888')
    // creditCard.setExpirationDate('0822')
    // creditCard.setCardCode('999')
    creditCard.setCardNumber(card.card_no)
    creditCard.setExpirationDate(card.exp_date)
    creditCard.setCardCode(card.card_code)

    var paymentType = new ApiContracts.PaymentType()
    paymentType.setCreditCard(creditCard)

    var orderDetails = new ApiContracts.OrderType()
    orderDetails.setInvoiceNumber('demo id')
    orderDetails.setDescription(invoiceInfo.description)
    var shipping = new ApiContracts.ExtendedAmountType()
    shipping.setAmount('1')
    shipping.setName('shipping name')
    shipping.setDescription(invoiceInfo.description)

    var billTo = new ApiContracts.CustomerAddressType()
    billTo.setFirstName(card.bill_first_name)
    billTo.setLastName(card.bill_last_name)
    billTo.setCompany(card.bill_company)
    billTo.setAddress(card.bill_address)
    billTo.setCity(card.bill_city)
    billTo.setState(card.bill_state)
    billTo.setZip(card.bill_zip)
    billTo.setCountry(card.bill_country)

    var shipTo = new ApiContracts.CustomerAddressType()
    shipTo.setFirstName(card.ship_first_name)
    shipTo.setLastName(card.ship_last_name)
    shipTo.setCompany(card.ship_company)
    shipTo.setAddress(card.ship_address)
    shipTo.setCity(card.ship_city)
    shipTo.setState(card.ship_state)
    shipTo.setZip(card.ship_zip)
    shipTo.setCountry(card.ship_ountry)

    var lineItemId1 = new ApiContracts.LineItemType()
    lineItemId1.setItemId('1')
    lineItemId1.setName('vase')
    lineItemId1.setDescription('cannes logo')
    lineItemId1.setQuantity('18')
    lineItemId1.setUnitPrice(45.00)

    var lineItemId2 = new ApiContracts.LineItemType()
    lineItemId2.setItemId('2')
    lineItemId2.setName('vase2')
    lineItemId2.setDescription('cannes logo2')
    lineItemId2.setQuantity('28')
    lineItemId2.setUnitPrice('25.00')

    var lineItemList = []
    lineItemList.push(lineItemId1)
    lineItemList.push(lineItemId2)

    var lineItems = new ApiContracts.ArrayOfLineItem()
    lineItems.setLineItem(lineItemList)

    var userFieldA = new ApiContracts.UserField()
    userFieldA.setName('A')
    userFieldA.setValue('Aval')

    var userFieldB = new ApiContracts.UserField()
    userFieldB.setName('B')
    userFieldB.setValue('Bval')

    var userFieldList = []
    userFieldList.push(userFieldA)
    userFieldList.push(userFieldB)

    var userFields = new ApiContracts.TransactionRequestType.UserFields()
    userFields.setUserField(userFieldList)
    var transactionRequestType = new ApiContracts.TransactionRequestType()
    transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHONLYTRANSACTION)
    transactionRequestType.setPayment(paymentType)
    transactionRequestType.setAmount(1)
    transactionRequestType.setLineItems(lineItems)
    transactionRequestType.setUserFields(userFields)
    transactionRequestType.setOrder(orderDetails)
    transactionRequestType.setShipping(shipping)
    transactionRequestType.setBillTo(billTo)
    transactionRequestType.setShipTo(shipTo)
    var createRequest = new ApiContracts.CreateTransactionRequest()
    createRequest.setMerchantAuthentication(merchantAuthenticationType)
    createRequest.setTransactionRequest(transactionRequestType)
    var ctrl = new ApiControllers.CreateTransactionController(createRequest.getJSON())
    // ctrl.setEnvironment('https://apitest.authorize.net/xml/v1/request.api') // sandbox
    ctrl.setEnvironment('https://api.authorize.net/xml/v1/request.api') // production
    ctrl.execute(function () {
      var apiResponse = ctrl.getResponse()
      var response = new ApiContracts.CreateTransactionResponse(apiResponse)
      console.log(response)
      if (response != null) {
        if (response.getMessages().getResultCode() === ApiContracts.MessageTypeEnum.OK) {
          if (response.getTransactionResponse().getMessages() != null) {
            Cart.update({ _id: cartsId }, { payment: card, is_paid: true, paymentDate: date })
            res.send({invoiceinfo: invoiceInfo, error: errorInfo})
          } else {
            if (response.getTransactionResponse().getErrors() != null) {
              errorInfo = response.getTransactionResponse().getErrors().getError()[0].getErrorText()
              res.send({invoiceinfo: invoiceInfo, error: errorInfo})
            }
          }
        } else {
          if (response.getTransactionResponse() != null && response.getTransactionResponse().getErrors() != null) {
            errorInfo = response.getTransactionResponse().getErrors().getError()[0].getErrorText()
            res.send({invoiceinfo: invoiceInfo, error: errorInfo})
          } else {
            errorInfo = response.getMessages().getMessage()[0].getText()
            res.send({invoiceinfo: invoiceInfo, error: errorInfo})
          }
        }
      } else {
        console.log('Null Response.')
      }
    })
  }

  * import (req, res) {
    res.ok()
  }
  /**
   * Search storeinfo by Name, description, price
   */
  * search (req, res) {
    if (req.input('key') !== '') {
      let regex = req.input('key')
      let price = parseInt(regex)
      if (!parseInt(regex)) {
        price = -1
      }
      const storeinfo = yield Storeinfo
        .find({ $or: [{ name: regex }, { price: price }, { description: regex }] })
        .exec()
      res.ok(storeinfo)
    } else {
      const storeinfo = yield Storeinfo
        .find({})
        .exec()
      res.ok(storeinfo)
    }
  }
}

module.exports = StoreinfoController
