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
  Route.resource('agents', 'AgentController').except('create', 'edit').middleware('auth')
  Route.get('agent/:aid/assign-customer/:cid', 'AgentController.assignCustomer').middleware('auth')
  Route.get('agent/:id/customer', 'AgentController.customers').middleware('auth')
}).prefix('api')

Route.group('customer', () => {
  Route.resource('customer', 'CustomerController').except('create', 'edit')
}).prefix('api').middleware('auth')

Route.group('appointment', () => {
  Route.get('/:id', 'AppointmentController.show')
  Route.get('agent/:id', 'AppointmentController.byAgent')
  Route.get('customer/:id', 'AppointmentController.byCustomer')
  Route.post('/', 'AppointmentController.store')
  Route.delete(':id', 'AppointmentController.destroy')
}).prefix('api/appointment')

Route.any('*', 'NuxtController.render')
