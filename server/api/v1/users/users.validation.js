const defaultLoginPropsSchema = {
	email: {
		type: "string",
		format: "email",
		minLength: 4,
		maxLength: 70
	},
	password: {
		type: "string",
		minLength: 4,
		maxLength: 256
	}
};

const shortStr = {
	type: "string",
	minLength: 2,
	maxLength: 256
};

const imageStr = {
	type: "string",
	pattern: "^/img/[0-9a-fA-F]{24}/.{4,100}$"
};

module.exports = {
	login: {
		body: {
			type: "object",
			required: ["email", "password"],
			properties: defaultLoginPropsSchema
		}
	},
	register: {
		body: {
			type: "object",
			required: ["email", "password", "name", "surname"],
			properties: Object.assign(
				{
					name: shortStr,
					surname: shortStr
				},
				defaultLoginPropsSchema
			)
		}
	},
	update: {
		body: {
			type: "object",
			required: ["name", "surname", "image"],
			properties: {
				name: shortStr,
				surname: shortStr,
				image: imageStr
			}
		}
	}
};
