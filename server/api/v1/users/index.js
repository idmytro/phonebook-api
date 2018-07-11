"use strict";

const { Router } = require("express");
const router = Router();
const ctrl = require("./users.controller");
const validations = require("./users.validation");
const mdl = require("../middle");
const passport = require("passport");

router.get("/profile", mdl.isAuthenticated, ctrl.getProfile);

router.put("/profile", mdl.isAuthenticated, mdl.validate(validations.update), ctrl.updateProfile);

router.post("/login", mdl.validate(validations.login), passport.authenticate("local"), ctrl.loginUser);

router.post("/register", mdl.validate(validations.register), ctrl.registerUser);

module.exports = router;
