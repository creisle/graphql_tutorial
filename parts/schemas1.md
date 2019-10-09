# Part2: The GraphQL Schema Language

GraphQL schemas are exactly what they sound like. These are fairly similar to any other type definition
language once you are familiar with the syntax. I'll briefly summarize the main points here

## Base Types

There are five [primitive types](https://www.apollographql.com/docs/apollo-server/schema/schema/#scalar-types)

- Int
- Float
- String
- Boolean
- ID (String but indicates unique-ness)

These are used to compose the more complex definitions

- Mutations (functions to make data modifications)
- Query (functions to query data)
- Types (Objects used as subcomponents in either of the above)
- Inputs (similar to types but only used for arguments)

For our database this translates into a couple of basic types.

```graphql
type Date {
    year: Int
    month: Int
    day: Int
}

type Study {
    id: ID
    name: String
}

type Patient {
    id: ID
    study: Study
    sex: String
    age: Int
}

type Biopsy {
    id: ID
    patient: Patient
    biopsyDate: Date
    diagnosis: String
}
```

After we have the types defined we need to use the 2 reserved type names (Query and Mutation) to define
the function names we will use for querying and editing/mutating.

## Query Functions

In a RESTful API we would likely have the following routes

```
GET /studies
GET /studies/:id
```

In graphql this is defined by a series of functions

```graphql
type Query {
    getStudies: [Study]
    getStudy(id: ID): Study
}
```

[Next Up: Part3: Simple Resolver Functions](resolvers1.md)

