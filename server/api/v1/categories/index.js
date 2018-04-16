"use strict";

const { Router } = require("express");
const router = Router();
const ctrl = require("./categories.controller");
const validations = require("./categories.validation");
const mdl = require("../middle");
const _ = require("lodash");

router.get("/", ctrl.getCategories);

router.post(
	"/",
	mdl.isAuthenticated,
	_.partial(mdl.validate, validations.addNew),
	ctrl.AddNewCategory
);

router.delete(
	"/:id",
	mdl.isAuthenticated,
	_.partial(mdl.validate, validations.idParam),
	ctrl.DeleteCategoryById
);

module.exports = router;
