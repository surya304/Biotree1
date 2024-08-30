let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

//MongoDB schemas
let Schema = mongoose.Schema;


// create a schema for user tracking 
let userTrackingSchema = new Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  tracking: {type: mongoose.Schema.Types.ObjectId, ref: 'Tracking', required: true},
  shorturl: {type: mongoose.Schema.Types.ObjectId, ref: 'UserShortURL', required: true},
  userid: {type: String, required: true},
  is_del : { type: Boolean, default: false },
  is_active : { type: Boolean, default: true },
  created_at : Date,
  updated_at : Date
});


let UserTracking = mongoose.model('UserTracking', userTrackingSchema);

module.exports = UserTracking;
