# Part4: Context: Connecting a Database

> In GraphQL, a Context is an object shared by all the resolvers of a specific execution. It's useful for keeping data such as authentication info, the current user, database connection, data sources and other things you need for running your business logic.

- https://graphql-modules.com/docs/introduction/context

## Connecting to a Database

Most requests follow a pattern you may already be familar with from developing REST APIs

- validate/authenticate the user
- get database session from pool (if using db pool and not single session)
- make request to database
- close session from pool (if using db pool and not single session)
- return results

This is a pattern that would be repeated for every request. Context allows us to share state between
requests. We define the context as one of the arguments when setting up the apollo server

```js
// In a real db this would require a connection setup here
const db = require('./repo');

const server = new ApolloServer({
      schema,
      context: ({req}) => {
          // add the database connection to the context so that it is available to the resolver functions
          // whatever you return here is passed as context to the resolver
          return {req, db};
      }
  });
```


Now that we have connected the *database*, let's modify our previous resolver functions to go through
the *database* instead. Each resolver will follow a the pattern describe above

```js
const resolvers = {
    Query: {
        getStudies: async (root, args, {db}) => {
            const session = await db.session();
            const result = await session.query('Studies').all();
            session.close();
            return result;
        },
        getPatients: async (root, args, {db}) => {
            const session = await db.session();
            const result = await session.query('Patients').all();
            session.close();
            return result;
        },
        getBiopsies: async (root, args, {db}) => {
            const session = await db.session();
            const result = await session.query('Biopsies').all();
            session.close();
            return result;
        },
    },
}
```

Try this out. The result should be the same

```graphql
query {
  getStudies {
    name
    id
  }
}
```


## Adding Authentication

> **TODO**: This section is not yet complete, please check back later


[Up Next: Part5: Defining Mutations](schemas2.md)