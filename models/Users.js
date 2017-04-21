var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name:   String,
  password: String,
  salt: String,
  victories: {type: Number, default: 0},
  gamesPlayed: {type: Number, default: 0}
});

module.exports = mongoose.model('User', userSchema);
