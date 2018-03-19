"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const _ = require("lodash");

const UsersSchema = new Schema({
    email: {type: String, required: true, unique: true, lowercase: true, trim: true},
    username: {type: String, required: true, unique: true, lowercase: true, trim: true},
    password: {type: String},
    addedAt: {type: Date, default: Date.now, select: false},
    role: {type: String, default: "user"},
    image: {type: String},
}, {
    collection: "UsersCollection"
});

UsersSchema.statics = {
    checkUser: function(req, email, password, done) {
        this
            .findOne({
                email: email
            })
            .select("password")
            .lean()
            .exec( (err, user) => {
                if (err) return done({message: err.message});
                if (!user) return done({message: "Email or password is not correct"});

                const compare = bcrypt.compareSync(password, user.password);
                if (compare) {
                    done(false, _.omit(user, ["password"]));
                } else {
                    done({message: "Email or password is not correct"});
                }
            });
    },
    serializeUser: function(user, cb) {
        cb(null, user);
    },
    deserializeUser: function(id, cb) {
        this
            .findById(id)
            .select('username role')
            .lean()
            .exec(function (err, user) {
                if (err) { return cb(err); }
                cb(null, user);
            });
    }
};

UsersSchema.pre('save', function() {
    if(this.isNew || this.isModified("password")) {
        this.password = bcrypt.hashSync(this.password, process.env.SALT_LENGTH);
    }
});

module.exports = mongoose.model('UsersModel', UsersSchema);