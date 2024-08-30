let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
//MongoDB schemas
let Schema = mongoose.Schema;
// create a schema
let usershorturlSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
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
    website: {
        type: String
    },
    campaign_source: {
        type: String
    },
    campaign_medium: {
        type: String
    },
    campaign_content: {
        type: String
    },
    campaign_name: {
        type: String
    },
    campaign_term: {
        type: String
    },
    utm_url: {

        type: String
    },
    // insta bio realated

    socialmedia: [{
        // id: { type: mongoose.Schema.Types.ObjectId, ref: 'SocialMedia' },
        // socialid: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "SocialMedia"
        // },
        // username: { type: String },
        type: Object

    }],


    clicks: { type: String },
    links: [{
        type: Object
    }],
    tracking: [{
        type: Object
    }],
    title: {
        type: String
    },
    bio: {
        type: String
    },
    img: {
        type: String
    },
    dashimg: {
        type: String
    },
    bg_color: {
        type: String
    },
    rect_border: {
        type: Boolean,
        default: false
    },
    rounded_border: {
        type: Boolean,
        default: false
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
let UserShortURL = mongoose.model('UserShortURL', usershorturlSchema);
module.exports = UserShortURL;