"use strict";

const path = require("path");
const { response } = require("../general");

exports.UploadNewFile = (req, res) => {
	const destination = req.file.path.split(path.sep);
	response(res, false, {
		message: "File upload successful",
		src: "/" + destination.slice(-3).join("/")
	});
};
