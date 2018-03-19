"use strict";

const { Router } = require('express');
const router = Router();
const ctrl = require('./users.controller');
const passport = require('passport');

router.get('/profile', ctrl.getProfile);

router.post('/login', passport.authenticate('local'), ctrl.loginUser);

router.post('/register', ctrl.registerUser);

module.exports = router;