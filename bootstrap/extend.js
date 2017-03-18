'use strict'

const Ioc = require('adonis-fold').Ioc

const MongoSerializer = require('../providers/MongoSerializer')

Ioc.extend('Adonis/Src/AuthManager', 'Mongo', function (app) {
  const mongoSerializer = make(MongoSerializer)
  return mongoSerializer
}, 'serializer')
