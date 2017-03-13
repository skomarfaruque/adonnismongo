'use strict'

const Ioc = require('adonis-fold').Ioc



class MongoSerializer {
  constructor (Hash) {
    this.user = use('App/Model/User')
    this.hash = Hash
  }
  /**
   * dependencies to be injected by the IoC container
   * @return {Array}
   */
  static get inject () {
    return ['Adonis/Src/Hash']
  }

  * findById (id, options) {
    return yield this.user.findOne({ email: id })
  }

  * findByCredentials (email, options) {
    const user = yield this.user.findOne({ email: email })
    return user
  }

  * validateCredentials (user, password, options) {
    if (!user || !user.password) {
      return false
    }
    const actualPassword = user.password
    try {
      return yield this.hash.verify(password, actualPassword)
    } catch (e) {
      return false
    }
  }

  primaryKey (authenticatorOptions) {
    return authenticatorOptions.uid
  }



}
Ioc.extend('Adonis/Src/AuthManager', 'Mongo', function (app) {
  const mongoSerializer = make(MongoSerializer)
  return mongoSerializer
}, 'serializer')
