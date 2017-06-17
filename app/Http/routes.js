'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')
Route.group('user', () => {
  Route.post('signup', 'UserController.store')
  Route.post('login', 'UserController.login')
  Route.post('signup/cofirmation', 'UserController.signupConfirm')
  Route.post('invitation', 'UserController.sendInvitation')
  Route.post('assign-role', 'UserController.assignRole')
  Route.post('forgot-password', 'UserController.forgotPassword')
  Route.post('reset-password', 'UserController.resetPassword')
}).prefix('api/user')

Route.resource('api/users', 'UserController').except('create', 'store', 'edit').middleware('auth')

Route.group('agent', () => {
  Route.resource('agents', 'AgentController').except('create', 'edit')
  Route.get('agent/:aid/assign-customer/:cid', 'AgentController.assignCustomer')
  Route.post('agent/:id/block-date', 'AgentController.addBlockDay')
  Route.delete('agent/:id/block-date/:blockid', 'AgentController.removeBlockDay')
  Route.get('agent/:id/block-dates', 'AgentController.getBlockDays')
  Route.get('agent/:id/customer', 'AgentController.customers')
  Route.get('agent/search', 'AgentController.search')
}).prefix('api').middleware('auth')

Route.group('staff', () => {
  Route.resource('staffs', 'StaffController').except('create', 'edit')
  Route.get('staff/search', 'StaffController.search')
}).prefix('api').middleware('auth')

Route.group('customer', () => {
  Route.resource('customers', 'CustomerController').except('create', 'edit')
  Route.get('customer/search', 'CustomerController.search')
}).prefix('api').middleware('auth')
Route.group('appointment', () => {
  Route.get('/:id', 'AppointmentController.show')
  Route.get('agent/:id', 'AppointmentController.byAgent')
  Route.get('customer/:id', 'AppointmentController.byCustomer')
  Route.post('/', 'AppointmentController.store')
  Route.post('start', 'AppointmentController.startAppointment')
  Route.post('pause', 'AppointmentController.pauseAppointment')
  Route.post('stop', 'AppointmentController.stopAppointment')
  Route.delete(':id', 'AppointmentController.destroy')
}).prefix('api/appointment')

Route.group('invoice', () => {
  Route.get('/', 'InvoiceController.index')
  Route.get('/:id', 'InvoiceController.show')
  Route.get('/invoice/paid/:id', 'InvoiceController.show')
  Route.get('agent/:id', 'InvoiceController.getByAgent')
  Route.get('/info/all/:id', 'InvoiceController.getAllAgent')
  Route.post('/item-add', 'InvoiceController.addItem')
  Route.get('/get/all', 'InvoiceController.getInvoices')
  Route.post('/payment', 'InvoiceController.payment')
}).prefix('api/invoice')

Route.group('supplies', () => {
  Route.resource('supplies', 'SuppliesController').except('create', 'edit')
  Route.get('supply/search', 'SuppliesController.search')
}).prefix('api').middleware('auth')

Route.group('storeinfo', () => {
  Route.resource('storeinfo', 'StoreinfoController').except('create', 'edit')
  Route.get('storein/search', 'StoreinfoController.search')
  Route.get('storeall/search', 'StoreinfoController.search')
  Route.post('storeinfo/update/:id', 'StoreinfoController.updateItemCartModification')
  Route.get('store/cart', 'StoreinfoController.cartInfo')
  Route.post('storeinfo/removecartitem/:id', 'StoreinfoController.removecart')
  Route.post('storeinfo/payment', 'StoreinfoController.payment')
}).prefix('api').middleware('auth')

Route.group('discountcode', () => {
  Route.resource('discountcode', 'DiscountcodeController').except('create', 'edit')
}).prefix('api').middleware('auth')

Route.any('*', 'NuxtController.render')
