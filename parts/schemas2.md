
# Part5: Defining Mutations

Mutation is another of the reserved words used in defining types (along with Query). The following
will compare routes you might see in a RESTful API to their equivalent in GraphQL

In a RESTful API we would likely have the following routes for editing and mutating the data

```
POST /studies
PATCH /studies/:id
DELETE /studies/:id
```

In graphql that might translate to something like this

```graphql
type Mutation {
    createStudy(name: String): Study
    editStudy(id: ID, newName: String): Study
    deleteStudy(id: ID): Study
}
```

This works for study where we only have 1 input parameter, but the other tables have more fields.
To accomadate these more complex types we define Inputs

```graphql
input DateInput {
    year: Int
    month: Int
    day: Int
}

input StudyInput {
    name: String!
}

input PatientInput {
    studyId: ID!
    patientStudyId: String!
    sex: String
    age: Int
}

input BiopsyInput {
    patientId: ID!
    biopsyDate: DateInput
    diagnosis: String
}
```

DateInput is identical to Date, so why do we need the DateInput?

> Inputs can only reference other inputs.

- https://stackoverflow.com/questions/52744900/apollo-graphql-type-must-be-input-type
- https://stackoverflow.com/questions/45806368/graphql-error-field-type-must-be-input-type-but-got?rq=1

Now that we have our input types we can use them to define our mutation functions. Change the initial
definition to (note we are limiting to creating and deleting for the scope of this tutorial)

```graphql
type Mutation {
    createStudy(input: StudyInput): Study
    deleteStudy(id: ID): Study

    createPatient(input: PatientInput): Patient
    deletePatient(id: ID): Patient

    createBiopsy(input: BiopsyInput): Biopsy
    deleteBiopsy(id: ID): Biopsy
}
```

Now that we have the mutation types defined, we need to link them to resolvers

[Up Next: Part6: Resolvers Part 2](resolvers2.md)




