const Message = require('../models/Message')

const resolvers = {
    Query: {
        messages: async () => {
            return Message.find()
        }
    },

    Mutation: {
        postMessage: async (parent, { content }) => {
            return Message.create({content})
        }
    }
}

module.exports = resolvers