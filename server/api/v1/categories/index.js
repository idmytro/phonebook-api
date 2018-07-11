"use strict";

const { Router } = require("express");
const router = Router();
const ctrl = require("./categories.controller");
const validations = require("./categories.validation");
const mdl = require("../middle");

router.get("/", ctrl.getCategories);

router.post("/", mdl.isAuthenticated, mdl.validate(validations.addNew), ctrl.AddNewCategory);

router.delete("/:id", mdl.isAuthenticated, mdl.validate(validations.idParam), ctrl.DeleteCategoryById);

module.exports = router;
