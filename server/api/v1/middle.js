"use strict";

const { Validator } = require("express-json-validator-middleware");
const validator = new Validator({
	allErrors: true,
	removeAdditional: "all",
	useDefaults: true
});

exports.validate = (props, req, res, next) => {
	validator.validate(props)(req, res, next);
};

exports.isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) return next();
	res.status(401).send({ message: "Not authorized" });
};
