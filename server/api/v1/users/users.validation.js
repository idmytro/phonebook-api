
const defaultLoginPropsSchema = {
    email: {
        type: 'string',
        format: 'email',
        minLength: 4,
        maxLength: 70
    },
    password: {
        type: 'string',
        minLength: 4,
        maxLength: 256
    }
};

const shortStr = {
    type: 'string',
    minLength: 2,
    maxLength: 256
};

module.exports = {
    login: {
        body: {
            type: 'object',
            required: ['email', 'password'],
            properties: defaultLoginPropsSchema
        }
    },
    register: {
        body: {
            type: 'object',
            required: ['email', 'password', 'name', 'surname'],
            properties: Object.assign({
                name: shortStr,
                surname: shortStr
            }, defaultLoginPropsSchema)
        }
    }
};