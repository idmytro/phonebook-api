"use strict";

const UsersModel = require("./users.model");
const _ = require("lodash");
const { response } = require("../general");

//TODO: add upload image
exports.getProfile = (req, res) => {
	// TODO: send real profile
	response(res, false, req.user);
};

exports.loginUser = (req, res) => {
	response(res, false, { message: "Log in successful" });
};

exports.registerUser = (req, res) => {
	UsersModel.create(req.body, (err, data) => {
		if (err) {
			let message = err.message;
			if (err.code === 11000) message = "User already exists";
			return response(res, { message });
		}
		req.login(_.pick(data, ["id", "email"]), err => {
			if (err) return response(res, { message: err });
			response(res, false, { message: "Register successful" });
		});
	});
};

exports.updateProfile = async (req, res) => {
	try {
		const user = await UsersModel.findById(req.user._id).exec();

		if (!user) {
			return response(res, { message: "user not found" });
		}

		Object.assign(user, req.body);

		const resp = await user.save();

		response(res, false, resp);
	} catch (e) {
		response(res, e);
	}
};
