"use strict";

const { Router } = require('express');
const router = Router();
const ctrl = require('./phonebook.controller');
const validations = require('./phonebook.validation');
const mdl = require('../middle');
const _ = require('lodash');

router.get('/', _.partial(mdl.validate, validations.getList), ctrl.getContacts);

router.post('/', _.partial(mdl.validate, validations.addNew), ctrl.AddNewContact);

router.get('/:id', _.partial(mdl.validate, validations.idParam), ctrl.GetContactById);

router.put('/:id', _.partial(mdl.validate, validations.updateContact), ctrl.UpdateContactById);

router.delete('/:id', _.partial(mdl.validate, validations.idParam), ctrl.DeleteContactById);

module.exports = router;