"use strict";

const { Types } = require('mongoose');
const ContactsModel = require('./phonebook.model');
const _ = require('lodash');

exports.getContacts = (req, res) => {
    let query = {
        addedBy: Types.ObjectId(req.user.id)
    };
    if(req.query.search !== "") {
        const regEx = {$regex: _.escapeRegExp(req.query.search), $options: "i"};
        query["$or"] = {
            name: regEx,
            surname: regEx,
            phone: regEx,
            email: regEx
        };
    }

    ContactsModel
        .find(query)
        .select('name surname')
        .sort({[req.query.sort]: req.query.sortValue})
        .skip(req.query.limit * (req.query.page - 1))
        .limit(req.query.limit)
        .lean()
        .exec( (err, contacts) => {
            res.send(contacts);
        });
};