"use strict";

const { Router } = require('express');
const router = Router();
const mdl = require('./middle');

router.use('/users', require('./users'));

router.use('/phonebook', mdl.isAuthenticated, require('./phonebook'));

module.exports = router;