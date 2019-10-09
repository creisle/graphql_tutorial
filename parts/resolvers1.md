
# Part3: Simple Resolver Functions

Resolvers are functions which define how to retrieve a particular field of information. Let's start
with the simplest resolver, which grabs the list of studies from the JSON file.

We'll start by writing the resolvers for the queries. Each resolver has the following function signature

```js
/**
 * @param {object} parent (aka root) the parent object
 * @param {object} args any arguments passed in from the request
 * @param {object} context created for every request
 * @param {object} info not often used
 */
(parent, args, context, info) => {

}
```

Try this out by querying what we have already. We can return the list of each type just by copying the
array from the JSON

```js
const data = require('./repo/data.json');

const resolvers = {
    Query: {
        getStudies: () => [...data.Studies],
        getPatients: () => [...data.Patients],
        getBiopsies: () => [...data.Biopsies]
    }
}
```

Try this out with the following query

```graphql
query {
  getStudies {
    name
    id
  }
}
```

This should return the following

```json
{
  "data": {
    "getStudies": [
      {
        "name": "Advanced GI Cancers",
        "id": "1"
      },
      {
        "name": "Refractory Celiacs",
        "id": "2"
      }
    ]
  }
}
```

We'll add resolvers for mutations and linked types after going over how to use context

[Up Next: Part4: Context: Connecting a Database](context.md)