"use strict";

const { Router } = require("express");
const router = Router();
const mdl = require("./middle");

router.use("/categories", require("./categories"));

router.use("/phonebook", mdl.isAuthenticated, require("./phonebook"));

router.use("/users", require("./users"));

module.exports = router;
