"use strict";

const CategoriesModel = require("./categories.model");
CategoriesModel.createBaseCategories();

const _ = require("lodash");
const { Types } = require("mongoose");
const { response } = require("../general");

exports.getCategories = (req, res) => {
	CategoriesModel.find()
		.lean()
		.exec(_.partial(response, res));
};

exports.AddNewCategory = (req, res) => {
	CategoriesModel.create(
		{
			name: req.body.name,
			addedBy: req.user._id
		},
		err => {
			response(res, err, { message: "Category created successful" });
		}
	);
};

exports.DeleteCategoryById = (req, res) => {
	CategoriesModel.findOneAndRemove({
		_id: Types.ObjectId(req.params.id),
		addedBy: req.user._id
	}).exec(err => {
		response(res, err, { message: "Category removed successful" });
	});
};
