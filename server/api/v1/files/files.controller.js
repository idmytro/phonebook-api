"use strict";

const path = require("path");
const { response } = require("../general");

exports.UploadNewFile = (req, res) => {
	if (!req.file) {
		return response(res, { message: "avatar not found" });
	}

	// TODO: check mime-type
	const destination = req.file.path.split(path.sep);
	response(res, false, {
		message: "File upload successful",
		src: "/" + destination.slice(-3).join("/")
	});
};
