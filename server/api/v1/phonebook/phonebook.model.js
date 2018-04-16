"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const _ = require("lodash");

const ContactsSchema = new Schema(
	{
		name: { type: String, trim: true, index: 1 },
		surname: { type: String, trim: true, index: 1 },
		position: { type: String },
		email: [{ type: String, lowercase: true, trim: true, index: 1 }],
		phone: [
			{
				category: { type: String },
				value: { type: String, lowercase: true, trim: true, index: 1 }
			}
		],
		bornDate: { type: Date },
		category: { type: Schema.ObjectId, ref: "CategoriesModel" },
		information: { type: String },
		image: { type: String },
		addedAt: { type: Date, default: Date.now, select: false },
		addedBy: {
			type: Schema.ObjectId,
			ref: "UsersModel",
			required: true,
			index: 1,
			select: false
		}
	},
	{
		collection: "ContactsCollection"
	}
);

ContactsSchema.statics = {};

ContactsSchema.pre("save", function() {});

ContactsSchema.post("save", function(doc, next) {
	doc
		.populate({
			path: "category",
			select: "name"
		})
		.execPopulate()
		.then(_.partial(next, false), next);
});

module.exports = mongoose.model("ContactsModel", ContactsSchema);
