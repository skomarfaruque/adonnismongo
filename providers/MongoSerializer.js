'use strict'

class MongoSerializer {
  constructor (Hash) {
    use('App/Model/Role')
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
    try {
      let user = yield this.user.findOne({ email: id }, 'name email role').populate('role', 'name permissions').exec()
      return user
    } catch (e) {
      return false
    }
  }

  * findByCredentials (email, options) {
    try {
      const user = yield this.user.findOne({ email: email })
      return user
    } catch (e) {
      return false
    }
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

module.exports = MongoSerializer
