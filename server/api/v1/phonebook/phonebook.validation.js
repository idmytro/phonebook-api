
module.exports = {
    getList: {
        query: {
            type: 'object',
            required: [],
            properties: {
                page: {
                    type: 'number',
                    minLength: 1,
                    maxLength: 256,
                    default: 1
                },
                limit: {
                    type: 'number',
                    enum: [25, 50, 100],
                    default: 25
                },
                sort: {
                    type: 'string',
                    enum: ['name', 'surname', 'phone', 'addedAt'],
                    default: 'name'
                },
                sortValue: {
                    type: 'number',
                    enum: [-1, 1],
                    default: 1
                },
                search: {
                    type: 'string',
                    minLength: 0,
                    maxLength: 100,
                    default: ""
                }
            }
        }
    },
    addNew: {
        body: {
            type: 'object',
            required: [],
            properties: {
                name: {
                    type: 'string',
                    maxLength: 255
                },
                surname: {
                    type: 'string',
                    maxLength: 255
                },
                position: {
                    type: 'string',
                    maxLength: 255
                },
                email: {
                    type: 'array',
                    uniqueItems: true,
                    maxLength: 25,
                    items: [
                        {
                            type: 'string',
                            format: 'email',
                            minLength: 4,
                            maxLength: 70
                        }
                    ]
                },
                phone: {
                    type: 'array',
                    uniqueItems: true,
                    maxLength: 25,
                    items: [
                        {
                            type: 'string',
                            maxLength: 70
                        }
                    ]
                }
            }
        }
    }
};