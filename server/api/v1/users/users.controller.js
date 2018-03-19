"use strict";

const UsersModel = require('./users.model');

exports.getProfile = (req, res) => {
    res.send(req.user);
};

exports.loginUser = (req, res) => {
    res.send({message: "ok"});
};

exports.registerUser = (req, res) => {
    // TODO: WIP
    res.send({message: "ok"});
};