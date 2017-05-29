'use strict'
var ApiContracts = require('authorizenet').APIContracts
var ApiControllers = require('authorizenet').APIControllers

// end authorize
const moment = require('moment')
const _ = require('lodash')
const Helpers = use('Helpers')
const Appointment = use('App/Model/Appointment')
use('App/Model/User')
use('App/Model/Customer')


class InvoiceController {

  * index (req, res) {
    const invoices = yield Appointment.find({ invoice_settled: false }).populate('agent', 'name email').populate('customer', 'name email phone address1 address2 city state zipCode').exec()
    res.ok(invoices)
  }

  * show (req, res) {
    const id = req.param('id')
    const invoice = yield Appointment.findOne({ _id: id }).populate('agent', 'name email').populate('customer', 'name email phone address1 address2 city state zipCode').exec()
    res.ok(invoice)
  }

  * getByAgent (req, res) {
    var lastYear = moment().subtract(1,'year').toDate()
    var today = moment().toDate()
    let userId = req.param('id')
    if (userId === 'me') {
      userId = req.currentUser._id
    }
    const invoices = yield Appointment.find({invoice_settled: false, agent: userId, invoice_date: {$gte: lastYear, $lt: today}}).exec()
    var weeks = []
    var year = {}
    year.item = {}
    year.totalPrice = 0
    if (invoices.length) {
      invoices.forEach(function (invoiceVal, key) {
        if (invoiceVal.items.length) {
          invoiceVal.items.forEach(function (supplyVal, newKey) {
            let price = supplyVal.price * supplyVal.quantity * supplyVal.commission / 100
            year.totalPrice += price
            if (!year.item[supplyVal.description]) {
              year.item[supplyVal.description] = 0
            }
            year.item[supplyVal.description] += price
          })
        }
      })
    }
    for (var i = 0; i < 4; i++) {
      var weekData = {}
      weekData.item = {}
      var date = moment().subtract(i, 'week').startOf('week').toDate()
      var datePrevious = moment().subtract(i + 1, 'week').startOf('week').toDate()
      weekData.date = moment(date).format('MMMM Do YYYY')
      weekData.totalPrice = 0
      if (invoices.length) {
        invoices.forEach(function (invoiceVal, key) {
          if (datePrevious <= invoiceVal.invoice_date && invoiceVal.invoice_date < date) {
          // if (datePrevious) {
            if (invoiceVal.items.length) {
              invoiceVal.items.forEach(function (supplyVal, newKey) {
                let price = supplyVal.price * supplyVal.quantity * supplyVal.commission / 100
                weekData.totalPrice += price
                if (!weekData.item[supplyVal.description]) {
                  weekData.item[supplyVal.description] = 0
                }
                weekData.item[supplyVal.description] += price
              })
            }
          }
        })
      }
      weeks.push(weekData)
    }
    res.send({year: year, weeks: weeks})
  }

  * addItem (req, res) {
    const items = req.input('items')
    const id = req.input('id')
    yield Appointment.update({ _id: id }, { items }).exec()
  }
  * newFunc (res, invoiceInfo, paymentDescription, paymentTypeApp, discount, shippingAmount, tax) {
    var errorInfo = 'no'
    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType()
    merchantAuthenticationType.setName('44ZAqX44dc')
    merchantAuthenticationType.setTransactionKey('4G9CH39r9f2LgJ3V')

    var creditCard = new ApiContracts.CreditCardType()
    // creditCard.setCardNumber('4242424242424242')
    // creditCard.setExpirationDate('0822')
    // creditCard.setCardCode('999')
    creditCard.setCardNumber(paymentDescription.card_no)
    creditCard.setExpirationDate(paymentDescription.exp_date)
    creditCard.setCardCode(paymentDescription.card_code)

    var paymentType = new ApiContracts.PaymentType()
    paymentType.setCreditCard(creditCard)

    var orderDetails = new ApiContracts.OrderType()
    orderDetails.setInvoiceNumber('demo id')
    orderDetails.setDescription(invoiceInfo.description)

    // var tax = new ApiContracts.ExtendedAmountType();
    // tax.setAmount('4.26');
    // tax.setName('level2 tax name');
    // tax.setDescription('level2 tax');

    // var duty = new ApiContracts.ExtendedAmountType();
    // duty.setAmount('8.55');
    // duty.setName('duty name');
    // duty.setDescription('duty description');

    var shipping = new ApiContracts.ExtendedAmountType()
    shipping.setAmount('1')
    shipping.setName('shipping name')
    shipping.setDescription(invoiceInfo.description)

    var billTo = new ApiContracts.CustomerAddressType()
    billTo.setFirstName(paymentDescription.bill_first_name)
    billTo.setLastName(paymentDescription.bill_last_name)
    billTo.setCompany(paymentDescription.bill_company)
    billTo.setAddress(paymentDescription.bill_address)
    billTo.setCity(paymentDescription.bill_city)
    billTo.setState(paymentDescription.bill_state)
    billTo.setZip(paymentDescription.bill_zip)
    billTo.setCountry(paymentDescription.bill_country)

    var shipTo = new ApiContracts.CustomerAddressType()
    shipTo.setFirstName(paymentDescription.ship_first_name)
    shipTo.setLastName(paymentDescription.ship_last_name)
    shipTo.setCompany(paymentDescription.ship_company)
    shipTo.setAddress(paymentDescription.ship_address)
    shipTo.setCity(paymentDescription.ship_city)
    shipTo.setState(paymentDescription.ship_state)
    shipTo.setZip(paymentDescription.ship_zip)
    shipTo.setCountry(paymentDescription.ship_ountry)

    var lineItemId1 = new ApiContracts.LineItemType()
    lineItemId1.setItemId('1')
    lineItemId1.setName('vase')
    lineItemId1.setDescription('cannes logo')
    lineItemId1.setQuantity('18')
    lineItemId1.setUnitPrice(45.00)

    var lineItemId2 = new ApiContracts.LineItemType();
    lineItemId2.setItemId('2');
    lineItemId2.setName('vase2');
    lineItemId2.setDescription('cannes logo2');
    lineItemId2.setQuantity('28');
    lineItemId2.setUnitPrice('25.00');

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

    // var transactionSetting1 = new ApiContracts.SettingType();
    // transactionSetting1.setSettingName('testRequest');
    // transactionSetting1.setSettingValue('s1val');

    // var transactionSetting2 = new ApiContracts.SettingType();
    // transactionSetting2.setSettingName('testRequest');
    // transactionSetting2.setSettingValue('s2val');

    // var transactionSettingList = [];
    // transactionSettingList.push(transactionSetting1);
    // transactionSettingList.push(transactionSetting2);

    // var transactionSettings = new ApiContracts.ArrayOfSetting();
    // transactionSettings.setSetting(transactionSettingList);

    var transactionRequestType = new ApiContracts.TransactionRequestType()
    transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHONLYTRANSACTION)
    transactionRequestType.setPayment(paymentType)
    transactionRequestType.setAmount(1)
    transactionRequestType.setLineItems(lineItems)
    transactionRequestType.setUserFields(userFields)
    transactionRequestType.setOrder(orderDetails)
    // transactionRequestType.setTax(tax);
    // transactionRequestType.setDuty(duty);
    transactionRequestType.setShipping(shipping)
    transactionRequestType.setBillTo(billTo)
    transactionRequestType.setShipTo(shipTo)
    // transactionRequestType.setTransactionSettings(transactionSettings);

    var createRequest = new ApiContracts.CreateTransactionRequest()
    createRequest.setMerchantAuthentication(merchantAuthenticationType)
    createRequest.setTransactionRequest(transactionRequestType)


    var ctrl = new ApiControllers.CreateTransactionController(createRequest.getJSON())

    ctrl.execute(function () {
      var apiResponse = ctrl.getResponse()
      var response = new ApiContracts.CreateTransactionResponse(apiResponse)
      if (response != null) {
        if (response.getMessages().getResultCode() === ApiContracts.MessageTypeEnum.OK) {
          if (response.getTransactionResponse().getMessages() != null) {
          //  console.log('success')
            Appointment.update({ _id: invoiceInfo._id }, { $set: { invoice_settled: true, payment_method: paymentTypeApp, payment_method_desc: paymentDescription, invoice_date: new Date(), invoice_comment: invoiceInfo.invoice_comment, discount: discount, shipping: shippingAmount, tax: tax } }).exec()
            let updatedInvoice = Appointment.findOne({ _id: invoiceInfo._id }).exec()
            res.send({invoiceinfo: updatedInvoice, error: errorInfo})
          } else {
            if (response.getTransactionResponse().getErrors() != null) {
              errorInfo = response.getTransactionResponse().getErrors().getError()[0].getErrorText()
              res.send({invoiceinfo: invoiceInfo, error: errorInfo})
            }
          }
        } else {
          // console.log('Failed tran.')
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
  * payment (req, res) {
    const paymentTypeApp = req.input('paymentType')
    const discount = req.input('discount')
    const shipping = req.input('shipping')
    const tax = req.input('tax')
    const invoiceInfo = req.input('invoice')
    let invoiceComment = ''
    if (paymentTypeApp !== 'check') {
      invoiceComment = invoiceInfo.invoice_comment
    }
    const id = req.input('id')
    var errorInfo = 'no'
    let paymentDescription = {}
    if (paymentTypeApp === 'check') { // for check
      let storagePath = 'check_doc'
      const backFile = req.file('back_file', {
        maxSize: '2mb',
        allowedExtensions: ['jpg', 'png', 'jpeg']
      })
      const fileName = `${id}_back.${backFile.extension()}`
      yield backFile.move(Helpers.publicPath(storagePath), fileName)
      const frontFile = req.file('front_file', {
        maxSize: '2mb',
        allowedExtensions: ['jpg', 'png', 'jpeg']
      })
      const frontFileName = `${id}_front.${frontFile.extension()}`
      yield frontFile.move(Helpers.publicPath(storagePath), frontFileName)
      paymentDescription = {check_no: req.input('check_no'), account_no: req.input('account_no'), routing_no: req.input('routing_no'), back_file: backFile.uploadName(), front_file: frontFile.uploadName()}
      invoiceComment = req.input('invoiceComment')
    } else if (paymentTypeApp === 'card') { // for card
      return yield this.newFunc(res, invoiceInfo, req.input('paymentDescription'), paymentTypeApp, discount, shipping, tax)
    } else { // for cash
      paymentDescription = req.input('paymentDescription')
    }
    if (errorInfo === 'no') {
      yield Appointment.update({ _id: id }, { $set: { invoice_settled: true, payment_method: paymentTypeApp, payment_method_desc: paymentDescription, invoice_date: new Date(), invoice_comment: invoiceComment, discount: discount, shipping: shipping, tax: tax } }).exec()
      let updatedInvoice = yield Appointment.findOne({ _id: id }).exec()
      res.send({invoiceinfo: updatedInvoice, error: errorInfo})
    } else {
      res.send({invoiceinfo: invoiceInfo, error: errorInfo})
    }
  }

}

module.exports = InvoiceController
