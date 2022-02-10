//require express- pipeline for middleware
const expresss = require('express')
//require ApollServer, accepts graphql requests
const { ApolloServer, gql } = require('apollo-server-express')
//import mongoose connection to mongodb as db
const db = require ('./config/connection')

//async function required to initialize server
async function start() {
    //define port
const PORT = 3000

//create a new instance of ApolloServer with typeDefs and Resolvers imported from schemas
const server = new ApolloServer({ typeDefs, resolvers })
//define our app as express
const app = expresss()
//start the server beofre middleware can be applied
await server.start()

//apply express to server as middleware handler
server.applyMiddleware({app})

db.once('Open', () => {
        //define where the server will start
        app.listen(PORT, () => console.log(`server ready at http://localhost:3000${server.graphqlPath} `))
    }
)

}

//start the server with catch for errors
start().catch((err) => console.log(err))