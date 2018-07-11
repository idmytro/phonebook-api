"use strict";

const { Router } = require("express");
const router = Router();
const ctrl = require("./phonebook.controller");
const validations = require("./phonebook.validation");
const mdl = require("../middle");

router.get("/", mdl.validate(validations.getList), ctrl.getContacts);

router.post("/", mdl.validate(validations.addNew), ctrl.AddNewContact);

router.get("/:id", mdl.validate(validations.idParam), ctrl.GetContactById);

router.put("/:id", mdl.validate(validations.updateContact), ctrl.UpdateContactById);

router.delete("/:id", mdl.validate(validations.idParam), ctrl.DeleteContactById);

module.exports = router;
