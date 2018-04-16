"use strict";

const UsersModel = require("./users.model");
const _ = require("lodash");

//TODO: add upload image
exports.getProfile = (req, res) => {
	// TODO: send real profile
	res.send(req.user);
};

exports.loginUser = (req, res) => {
	res.send({ message: "Log in successful" });
};

exports.registerUser = (req, res) => {
	UsersModel.create(req.body, (err, data) => {
		if (err) {
			let message = err.message;
			if (err.code === 11000) message = "User already exists";
			return res.status(400).send({ message });
		}
		req.login(_.pick(data, ["id", "email"]), err => {
			if (err) return res.status(500).send({ message: err });
			res.send({ message: "Register successful" });
		});
	});
};
