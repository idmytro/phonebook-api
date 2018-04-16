"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const _ = require("lodash");

const CategoriesSchema = new Schema(
	{
		name: { type: String, trim: true, unique: true },
		addedAt: { type: Date, default: Date.now, select: false },
		addedBy: { type: Schema.ObjectId, ref: "UsersModel", select: false }
	},
	{
		versionKey: false,
		collection: "CategoriesCollection"
	}
);

CategoriesSchema.statics = {
	createBaseCategories: function() {
		const BaseCategories = ["Work", "Friend", "Family"];
		const model = this;
		model
			.find({ name: { $in: BaseCategories } })
			.select("name")
			.exec((err, result) => {
				if (err) throw err;
				if (result.length !== 3) {
					for (let cat of BaseCategories) {
						model.create({ name: cat }, err => {
							if (err && err.code !== 11000)
								console.error("Base category creation error!", cat, err);
						});
					}
				}
			});
	}
};

CategoriesSchema.pre("save", function() {});

module.exports = mongoose.model("CategoriesModel", CategoriesSchema);
