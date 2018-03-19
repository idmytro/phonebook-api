
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
            required: ['email', 'password', 'username'],
            properties: Object.assign({
                username: {
                    type: 'string',
                    minLength: 4,
                    maxLength: 256
                }
            }, defaultLoginPropsSchema)
        }
    }
};