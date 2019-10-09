const express = require('express');
const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');

const typeDefs = require('./types');
const resolvers = require('./resolvers');


const main = () => {
    const app = express();
    const schema = makeExecutableSchema({typeDefs, resolvers});

    const server = new ApolloServer({
        schema,
    });
    server.applyMiddleware({ app });

    // The `listen` method launches a web server.
    const PORT = 8080;
    app.listen({ port: PORT }, () =>
        console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    );
};

main();