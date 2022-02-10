//require express- pipeline for middleware
const expresss = require('express')
//require ApollServer, accepts graphql requests
const { ApolloServer, gql } = require('apollo-server-express')
//import typeDefs and resovlers
const { resolvers, typeDefs } = require('./schemas')
//import mongoose connection to mongodb as db
const db = require ('./config/connection')
//import everything needed to create http server
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { createServer } = require('http')
const http = require('http')
//import everything needed to create a subscription server
const {execute, subscribe} = require('graphql')
const {SubscriptionServer} = require('subscriptions-transport-ws')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { PubSub } = require('graphql-subscriptions')
const path = require('path')
const pubsub = new PubSub()
const schema = makeExecutableSchema({ typeDefs, resolvers})

//async function required to initialize server
async function start(schema) {
    //define port
    const PORT = 3001
    //define our app as express
    const app = expresss()
    const httpServer = http.createServer(app)

    //make typeDefs, resolvers an executable schema to be used by SubscriptionServer
    
    
    //create subscriptionserver
    const subscriptionServer = SubscriptionServer.create({
        //it takes in a schema object
        schema,
        //functions imported from graphql
        execute,
        subscribe,
    }, {
        server: httpServer,
        path:'/'
    })

    //create a new instance of ApolloServer with typeDefs and Resolvers imported from schemas
    const server = new ApolloServer({ 
        schema,
        plugins: [
            {async serverWillStart() {
                return {
                    async drainServer() {
                        subscriptionServer.close()
                    }
                }
        }}]
    })
    //start the server beofre middleware can be applied
    await server.start()

    //apply express to server as middleware handler
    server.applyMiddleware({app, path:'/'})

    app.use(expresss.urlencoded({extended: false}))
    app.use(expresss.json())

    db.once('open', async () => {
            //define where the server will start
           httpServer.listen(PORT, () => {
               console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
               console.log(`🚀 subscriptions ready at ws:localhost:${PORT}${server.subscriptionsPath}`)

           })
        }
    )

}

//start the server with catch for errors
start(schema).catch((err) => console.log(err))