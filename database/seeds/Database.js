'use strict'

/*
|--------------------------------------------------------------------------
| Database Seeder
|--------------------------------------------------------------------------
| Database Seeder can be used to seed dummy data to your application
| database. Here you can make use of Factories to create records.
|
| make use of Ace to generate a new seed
|   ./ace make:seed [name]
|
*/

// const Factory = use('Factory')

class DatabaseSeeder {

  * run () {
    const role = yield use('App/Model/Role').create({
      name: 'Admin',
      permissions: ['user-create', 'user-update', 'user-delete']
    })
    yield use('App/Model/User').create({
      name: 'Admin',
      email: 'admin@email.com',
      password: '123456',
      role: role
    })
    return true
  }

}

module.exports = DatabaseSeeder
