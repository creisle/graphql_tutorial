# Part1: Setup

- [Database Tables](#database-tables)
- [Clone this repo and checkout the start branch](#clone-this-repo-and-checkout-the-start-branch)
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


## Clone this repo and checkout the start branch

```bash
git clone https://github.com/creisle/graphql_tutorial.git
cd graphql_tutorial
git checkout start
```

## Intialize the package

Next set this up as a node package using npm init

```
npm init --yes
```

Set `src/index.js` as the entry point

## Install the Required Packages

```
npm install apollo-server-express graphql express --save
```

## Connect ApolloServer to express

Add the following code to the `src/index.js` file.

```js
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
```

Create another file `src/types.js` and add this type definition stub (we will fill this out later)

```js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
`;

module.exports = typeDefs;
```

Finally create the empty resolvers module `src/resolvers.js`

```js
module.exports = {};
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

See we have not yet defined any types or resolvers, currently this will throw an error on start

## Resources

- https://www.apollographql.com/docs/apollo-server/getting-started
- https://www.apollographql.com/docs/apollo-server/migration-two-dot
- https://marmelab.com/blog/2017/09/03/dive-into-graphql.html


[Next Up: Part2: The GraphQL Schema Language](schemas1.md)