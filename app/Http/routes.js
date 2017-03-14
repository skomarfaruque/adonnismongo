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
  Route.post('user/assign-role', 'UserController.assignRole')
  Route.resource('users', 'UserController').except('create', 'store', 'edit').middleware('auth')
  Route.post('/auth', function* (request, response) {
    const session = yield request.session.all()
    const body = yield request.all()
    response.ok({body, session})
  })
}).prefix('api')
// Route.post('/api/user', 'UserController.create')
// Route.get('/api/users', 'UserController.all')
Route.any('*', 'NuxtController.render')
