# Part1: Setup

- [Database Tables](#database-tables)
- [Intialize the package](#intialize-the-package)
- [Install the Required Packages](#install-the-required-packages)
- [Connect ApolloServer to express](#connect-apolloserver-to-express)
- [Add the start script](#add-the-start-script)
- [Resources](#resources)

## Database Tables

For this tutorial we'll be modelling our schema after a database of clinical biopsies with the
following 3 tables

- Studies
  - id
  - name
- Patients
  - id
  - study_id
  - sex
  - age
- Biopsies
  - id
  - patient_id
  - biopsy_date
  - diagnosis

## Intialize the package

```
npm init --yes
```

Set `src/index.js` as the entry point

## Install the Required Packages

```
npm install apollo-server graphql express --save
```

## Connect ApolloServer to express

Add the following code to the `src/index.js` file.

```js
const express = require('express');
const { ApolloServer, makeExecutableSchema } = require('apollo-server');

// Must have a type defined to be able to start
const typeDefs = `
type Date {
    year: Int
}
`;  // TODO
const resolvers = {}; // TODO

const app = express();
const schema = makeExecutableSchema({typeDefs, resolvers});

const server = new ApolloServer({ schema });
server.applyMiddleware({ app });

// The `listen` method launches a web server.
const POST = 8080;
app.listen({ port: PORT }, () =>
  console.log(`Server ready at http://localhost:${POST}${server.graphqlPath}`)
);
```

## Add the start script

Add the start script to the `package.json`

```json
{
    "scripts": {
        "start": "node src/index.js"
    }
}
```

The server can now be started as follows

```
npm start
```

## Resources

- https://www.apollographql.com/docs/apollo-server/getting-started
- https://www.apollographql.com/docs/apollo-server/migration-two-dot
- https://marmelab.com/blog/2017/09/03/dive-into-graphql.html


[Next Up: Part2: The GraphQL Schema Language](schemas1.md)