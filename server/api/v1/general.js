"use strict";

exports.response = (res, err, result) => {
	let status = 200;
	if (err) {
		status = 500;
		result = err.message;
	}
	res.status(status).send(result);
};
