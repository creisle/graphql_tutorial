const express = require('express');
const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');

const typeDefs = require('./types');
const resolvers = require('./resolvers');
const db = require('./repo');

const main = () => {
    const app = express();
    const schema = makeExecutableSchema({typeDefs, resolvers});

    const server = new ApolloServer({
        schema,
        context: ({req}) => {
            // add the database connection to the context so that it is available to the resolver functions
            // whatever you return here is passed as context to the resolver
            return {req, db};
        }
    });
    server.applyMiddleware({ app });

    // The `listen` method launches a web server.
    const PORT = 8080;
    app.listen({ port: PORT }, () =>
        console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    );
};

main();