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
Route.group('api', () => {
  Route.post('user/signup', 'UserController.store')
  Route.post('user/login', 'UserController.login')
  Route.post('user/signup/cofirmation', 'UserController.signupConfirm')
  Route.post('user/invitation', 'UserController.sendInvitation')
  Route.post('user/assign-role', 'UserController.assignRole')
  Route.post('user/forgot-password', 'UserController.forgotPassword')
  Route.post('user/reset-password', 'UserController.resetPassword')
  Route.resource('users', 'UserController').except('create', 'store', 'edit').middleware('auth')
  Route.resource('agents', 'AgentController').except('create', 'edit').middleware('auth')
}).prefix('api')
// Route.post('/api/user', 'UserController.create')
// Route.get('/api/users', 'UserController.all')
Route.any('*', 'NuxtController.render')
