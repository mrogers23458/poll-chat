const Message = require('../models/Message')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Query: {
        messages: async () => {
            return Message.find()
        }
    },

    Mutation: {
        postMessage: async (parent, { content }) => {
            pubsub.publish('MESSAGE_CREATED', {messageCreated: content})
            return Message.create({content})
        }
    },

    Subscription: {
        messageCreated: {
            subscribe: () => pubsub.asyncIterator(['MESSAGE_CREATED'])
        }
    }
}

module.exports = resolvers