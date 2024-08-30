let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

//MongoDB schemas
let Schema = mongoose.Schema;


// create a schema
let styleSchema = new Schema({
  title : { type: String},
  bio : { type: String},
  img : { type: String },
  bg_color  : { type: String},
  rect_border : { type: Boolean, default: false },
  rounded_border : { type: Boolean, default: false },
  is_del : { type: Boolean, default: false },
  is_active : { type: Boolean, default: true },
  created_at : Date,
  updated_at : Date
});


let Style = mongoose.model('Style', styleSchema);

module.exports = Style;
