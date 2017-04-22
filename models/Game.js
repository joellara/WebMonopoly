var mongoose = require('mongoose');

var boardSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Board', boardSchema);
