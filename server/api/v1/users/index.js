"use strict";

const { Router } = require('express');
const router = Router();
const ctrl = require('./users.controller');
const validations = require('./users.validation');
const mdl = require('../middle');
const passport = require('passport');
const _ = require('lodash');

router.get('/profile', mdl.isAuthenticated, ctrl.getProfile);

router.post('/login', _.partial(mdl.validate, validations.login), passport.authenticate('local'), ctrl.loginUser);

router.post('/register', _.partial(mdl.validate, validations.register), ctrl.registerUser);

module.exports = router;