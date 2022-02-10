const { gql } = require('apollo-server-express')

const typeDefs = gql `
    type Message {
        _id: ID
        content: String
    }

    type Query {
        messages: [Message]
    }
`

module.exports = typeDefs