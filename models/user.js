var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: String,
  password: String,
  alias: String,
  created: Date
})

exports.schema = mongoose.model('user', userSchema);

exports.name = 'user';