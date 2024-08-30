let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

//MongoDB schemas
let Schema = mongoose.Schema;


// create a schema
let bgColorSchema = new Schema({
    title: { type: String, required: true, unique: true },
    color: { type: String, required: true, unique: true },
    is_del: { type: Boolean, default: false },
    is_active: { type: Boolean, default: true },
    created_at: Date,
    updated_at: Date
});



let BgColor = mongoose.model('BgColor', bgColorSchema);

module.exports = BgColor;