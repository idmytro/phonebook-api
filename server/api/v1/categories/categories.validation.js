module.exports = {
	addNew: {
		body: {
			type: "object",
			required: ["name"],
			properties: {
				name: {
					type: "string",
					maxLength: 255
				}
			}
		}
	},
	idParam: {
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
	}
};
