let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

//MongoDB schemas
let Schema = mongoose.Schema;


// create a schema
let messengerSchema = new Schema({
  title : { type: String, required: true, unique: true},
  url  : { type: String},
  icon : { type: String },
  order : { type: Number, required: true},
  is_del : { type: Boolean, default: false },
  is_active : { type: Boolean, default: true },
  created_at : Date,
  updated_at : Date
});


let Messenger = mongoose.model('Messenger', messengerSchema);

module.exports = Messenger;
