const { gql } = require('apollo-server-express')

const typeDefs = gql `
    type Message {
        _id: ID
        content: String
    }

    type Query {
        messages: [Message]
    }

    type Mutation {
        postMessage(
            content: String
        ): Message
    }

    type Subscription {
        messageCreated: Message
    }
`

module.exports = typeDefs