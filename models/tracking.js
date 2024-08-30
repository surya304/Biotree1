let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

//MongoDB schemas
let Schema = mongoose.Schema;


// create a schema
let trackingSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    prefixname: {
        type: String,
        required: true,
        unique: true
    },
    icon: {
        type: String,
        required: true
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


let Tracking = mongoose.model('Tracking', trackingSchema);

module.exports = Tracking;