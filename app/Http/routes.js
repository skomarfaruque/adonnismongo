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
  Route.resource('users', 'UserController').except('create', 'edit')
}).prefix('api')
// Route.post('/api/user', 'UserController.create')
// Route.get('/api/users', 'UserController.all')
Route.any('*', 'NuxtController.render')
