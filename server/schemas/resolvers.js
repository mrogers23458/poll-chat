const Message = require('../models/Message')

const resolvers = {
    Query: {
        messages: async () => {
            return Message.find()
        }
    }
}

module.exports = resolvers