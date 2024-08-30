let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
//MongoDB schemas
let Schema = mongoose.Schema;
// create a schema
let Trackingdata1 = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    shortcode: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    }, // shortenurl (or) shortenurl_utm (or) instabio
    // shorturl, shorturl_utm related
    clicks: {
        type: String
    },
    shorturlid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserShortURL',
        required: true
    },
    socialmedia: [{
        type: Object

    }],
    links: [{
        type: Object
    }],
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
let Trackingdata = mongoose.model('Trackingdata', Trackingdata1);
module.exports = Trackingdata;