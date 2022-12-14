const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config');


const server = new ApolloServer({

    cors: {
		origin: '*',			// <- allow request from all domains
		credentials: true 
    },		// <- enable CORS response for requests with credentials (cookies, http authentication)
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
})

mongoose.connect(MONGODB, { useNewUrlParser : true })
.then(()=>{
    console.log('Mongodb connecté');
    return server.listen({port : 5001});
})
.then( res => {
    console.log(`serveur runing at ${res.url}`)
})