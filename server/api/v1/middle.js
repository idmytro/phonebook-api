"use strict";

const { Validator } = require('express-json-validator-middleware');
const validator = new Validator({
    allErrors: true,
    removeAdditional: "all"
});

exports.validate = (props, req, res, next) => {
    validator.validate(props)(req, res, next);
};