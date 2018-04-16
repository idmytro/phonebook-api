const objectId = {
	params: {
		type: "object",
		required: ["id"],
		properties: {
			id: {
				type: "string",
				pattern: "^[0-9a-fA-F]{24}$"
			}
		}
	}
};

const contactBody = {
	body: {
		type: "object",
		required: [],
		properties: {
			name: {
				type: "string",
				maxLength: 255
			},
			surname: {
				type: "string",
				maxLength: 255
			},
			position: {
				type: "string",
				maxLength: 255
			},
			email: {
				type: "array",
				uniqueItems: true,
				maxLength: 25,
				items: [
					{
						type: "string",
						format: "email",
						minLength: 4,
						maxLength: 70
					}
				]
			},
			phone: {
				type: "array",
				uniqueItems: true,
				maxLength: 25,
				items: {
					type: "object",
					properties: {
						category: {
							type: "string",
							enum: ["mobile", "work", "home"],
							default: "mobile"
						},
						value: {
							type: "string",
							maxLength: 70
						}
					},
					required: ["category", "value"]
				}
			},
			bornDate: {
				type: "string",
				format: "date",
				formatMinimum: "1950-01-01"
				// TODO: "formatMaximum":
			},
			category: {
				type: "string",
				pattern: "^[0-9a-fA-F]{24}$"
			},
			information: {
				type: "string",
				maxLength: 1024
			}
		}
	}
};

module.exports = {
	getList: {
		query: {
			type: "object",
			required: [],
			properties: {
				page: {
					type: "number",
					minLength: 1,
					maxLength: 256,
					default: 1
				},
				limit: {
					type: "number",
					enum: [25, 50, 100],
					default: 25
				},
				sort: {
					type: "string",
					enum: ["name", "surname", "phone", "addedAt"],
					default: "name"
				},
				sortValue: {
					type: "number",
					enum: [-1, 1],
					default: 1
				},
				search: {
					type: "string",
					minLength: 0,
					maxLength: 100,
					default: ""
				},
				category: {
					type: "string",
					pattern: "^[0-9a-fA-F]{24}$"
				}
			}
		}
	},
	addNew: contactBody,
	idParam: objectId,
	updateContact: Object.assign({}, contactBody, objectId)
};
