let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

//MongoDB schemas
let Schema = mongoose.Schema;


// create a schema
let shorturlSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  is_del: {
    type: Boolean,
    default: false
  },
  is_active: {
    type: Boolean,
    default: true
  },
  created_at: Date,
  updated_at: Date
});


let ShortURL = mongoose.model('ShortURL', shorturlSchema);

module.exports = ShortURL;