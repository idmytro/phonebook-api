"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require("lodash");

const ContactsSchema = new Schema({
    name: {type: String, trim: true, index: 1},
    surname: {type: String, trim: true, index: 1},
    position: {type: String},
    email: [{type: String, lowercase: true, trim: true, index: 1}],
    phone: [{type: String, lowercase: true, trim: true, index: 1}],
    picture: {type: String},
    addedAt: {type: Date, default: Date.now, select: false},
    addedBy: {type: Schema.ObjectId, ref: "UsersModel", required: true, index: 1, select: false}
}, {
    collection: "ContactsCollection"
});

ContactsSchema.statics = {
};

ContactsSchema.pre('save', function() {
});

module.exports = mongoose.model('ContactsModel', ContactsSchema);