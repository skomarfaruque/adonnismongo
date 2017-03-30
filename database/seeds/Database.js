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
    const role = use('App/Model/Role')
    yield role.remove({})
    const roles = yield role.create([{
      name: 'Admin',
      permissions: ['calendar-view', 'agent-view', 'admin-view', 'customer-view', 'supply-view', 'invoice-view', 'store-view', 'user-create', 'user-update', 'user-delete', 'book-create', 'book-update', 'book-delete']
    }, {
      name: 'Staff',
      permissions: ['calendar-view', 'admin-view', 'customer-view', 'user-create', 'user-update', 'user-delete', 'book-create', 'book-update', 'book-delete']
    }, {
      name: 'Agent',
      permissions: ['calendar-view', 'admin-view', 'customer-view', 'supply-view', 'invoice-view', 'book-create', 'book-update', 'book-delete']
    }])
    const user = use('App/Model/User')
    yield user.remove({})
    yield user.create({
      name: 'Admin',
      email: 'admin@email.com',
      password: '123456',
      role: roles[0]
    })
    yield user.create({
      name: 'Staff',
      email: 'staff@email.com',
      password: '123456',
      role: roles[1]
    })
    yield user.create({
      name: 'Agent',
      email: 'agent@email.com',
      password: '123456',
      role: roles[2]
    })
    return true
  }

}

module.exports = DatabaseSeeder
