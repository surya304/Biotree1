let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

//MongoDB schemas
let Schema = mongoose.Schema;


// create a schema
let messengerSchema = new Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  name : { type: String, required: true},
  tracking: [{ type:Object, required: true }],
  email  : { type: String},
  mobile : { type: String },
  is_del : { type: Boolean, default: false },
  is_active : { type: Boolean, default: true },
  created_at : Date,
  updated_at : Date
});


let Client = mongoose.model('Client', messengerSchema);

module.exports = Client;
