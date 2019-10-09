# Part7: Query Filters

## Adding Basic Query Filters

Adding query filters requires adding arguments to the schema definition and then using the `args`
parameter of the resolver. This is similar to how we created the get by ID queries.

Currently the definition for the getStudies query looks like this

```graphql
type Query {
    getStudies: [Study]
}
```

Add a name paramter to allow filtering queries by name

```graphql
type Query {
    getStudies(name: String): [Study]
}
```

Now we use this argument in the corresponding resolver from this

```js
const resolvers = {
    ...
    Query: {
        ...
        getStudies: async (root, args, {db}) => {
            const session = await db.session();
            const result = await session.query('Studies').all();
            session.close();
            return result;
        },
    }
}
```

to this

```js
const resolvers = {
    ...
    Query: {
        ...
        getStudies: async (root, {name}, {db}) => {
            const session = await db.session();

            let query = session.query('Studies');
            if (name) {
                query.where({name});
            }
            const result = await query.all();
            session.close();
            return result;
        },
    }
}
```

Try this out in the playground

```graphql
query {
  getStudies(name: "Advanced GI Cancers") {
    name
    id
  }
}
```

## Pagination

Just like REST there are a number of different possible patterns that can be followed here but
the implementation follows a similar implementation to above.

- https://graphql.org/learn/pagination/
- https://www.apollographql.com/docs/react/data/pagination/

Let's modify the studies endpoint again to add pagination. Note that we've gone with the limit/offset
model of paginating simply for ease of use.

First we modify the schema definition

```graphql
type Query {
    getStudies(name: String, limit: Int, skip: Int): [Study]
}
```

Then the resolver must be updated to use the new arguments

```js
const resolvers = {
    ...
    Query: {
        ...
        getStudies: async (root, {name, skip, offset}, {db}) => {
            const session = await db.session();

            let query = session.query('Studies');
            if (name) {
                query.where({name});
            }
            let result = await query.all();

            // NOTE: if this were an actual database you'd probably want to add limit/skip to the query itself
            if (skip) {
                result = result.slice(skip);
            }
            if (limit) {
                result = result.slice(0, limit);
            }
            session.close();
            return result;
        },
    }
}
```

Try it out

```graphql
query {
  getStudies(limit: 1) {
    name
    id
  }
}
```

## Complex Query Filters

Some REST APIs give the requester very flexible query options by defining custom JSON objects and
having the user query through POST requests. This is not RESTful and has a lot of other downsides.

While it's recommended to avoid complex inputs where possible. If its necessary, here's
a couple examples/implementations I've found on how to go about it when you need to.

- https://grandstack.io/docs/graphql-filtering.html
- https://www.prisma.io/blog/designing-powerful-apis-with-graphql-query-parameters-8c44a04658a9

We can get graphql to do some of the validation of the inputs here by defining *filter* input types.

Let's start by adding an OR input type

```graphql
input NameComparison {
    name: String!
    operator: String
}

input Clause {
    OR: [NameComparison!]!
}

```

Then add this as a possible argument to the `getStudies` definition.


```graphql
type Query {
    getStudies(name: String, limit: Int, skip: Int, filters: Clause): [Study]
}
```

We would call this argument as follows

```graphql
query {
  getStudies(filters: {OR: [{name: "x"}, {name: "y"}]}) {
    name
    id
  }
}
```

Linking these filter arguments up to our database models will still fall to us to implement.
We won't cover that here since it will depend on the DB/ORM you are using anyway.


[Up Next: Part8: Optimization using Data Loaders](dataloaders.md)