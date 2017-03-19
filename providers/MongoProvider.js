'use strict'

const ServiceProvider = require('adonis-fold').ServiceProvider
const Mongoose = require('mongoose')

class MongoProvider extends ServiceProvider {

  * register () {
    this.app.singleton('Adonis/Addons/Mongoose', function (app) {
      const Env = use('Env')
      const mongoHost = Env.get('MONGO_HOST', 'localhost')
      const mongoPort = Env.get('MONGO_PORT', '27017')
      const mongoDb = Env.get('MONGO_DATABASE', 'backportal-app')
      const mongoUser = Env.get('MONGO_USER', '')
      const mongoPass = Env.get('MONGO_PASS', '')

      const connectUri = `${mongoHost}:${mongoPort}/${mongoDb}`
      const connectionString = (mongoUser !== '' || mongoPass !== '') ? `${mongoUser}:${mongoPass}@${connectUri}` : connectUri
      Mongoose.Promise = global.Promise
      Mongoose.connect(connectionString)

      return Mongoose
    })
  }



}

module.exports = MongoProvider
