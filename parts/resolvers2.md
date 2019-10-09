# Part6: Resolvers Part 2

## Get by ID Resolvers

Having the database connected to a database allows us to more easily define the get by ID
resolvers as well.

```js
const resolvers = {
    Query: {
        getStudies: async (root, args, {db}) => { ... },
        getPatients: async (root, args, {db}) => { ... },
        getBiopsies: async (root, args, {db}) => { ... },

        getStudy: async (root, {id}, {db}) =>  {
            const session = await db.session();
            const [result] = await session.query('Studies').where({id}).all();
            session.close();
            return result;
        },
        getPatient: async (root, {id}, {db}) =>  {
            const session = await db.session();
            const [result] = await session.query('Patients').where({id}).all();
            session.close();
            return result;
        },
        getBiopsy: async (root, {id}, {db}) =>  {
            const session = await db.session();
            const [result] = await session.query('Biopsies').where({id}).all();
            session.close();
            return result;
        }
    },
}
```

Try this out with the following query

```graphql
query {
  getStudy(id: 1) {
    name
    id
  }
}
```

## Linking Types through FK

To allow the queries to be nested and fetch data we'll need to define resolvers for the relationships.
These resolvers are defined under the type name instead of Query. These relationships will also be defined
on the types themselves.

Linking is where the parent/root object is used (the first argument of the resolver function).

```js
const resolvers = {
    Patient: {
        // This resolves the FK relationship between patient and study
        study: async ({studyId}, args, {db}) => {
            const session = await db.session();
            const [result] = await session.query('Studies').where({id: studyId}).all();
            session.close();
            return result;
        },
        biopsies: async ({id}, args, {db}) => {
            const session = await db.session();
            const result = await session.query('Biopsies').where({patientId: id}).all();
            session.close();
            return result;
        }
    },
    Study: {
        patients: async ({id}, args, {db}) => {
            const session = await db.session();
            const result = await session.query('Patients').where({studyId: id}).all();
            session.close();
            return result;
        }
    },
    Biopsy: {
        patient: async ({patientId}, args, {db}) => {
            const session = await db.session();
            const [result] = await session.query('Patients').where({id: patientId}).all();
            session.close();
            return result;
        }
    },
}
```

Also make the following additions to the schema

```graphql
type Study {
    ...
    patients: [Patient]
}

type Patient {
    ...
    biopsies: [Biopsy]
}
```

Now we are able to fetch nested content. Try out the following

```graphql
query {
  getStudies {
    id
    name
    patients {
      id
    }
  }
}
```

```json
{
  "data": {
    "getStudies": [
      {
        "id": "1",
        "name": "Advanced GI Cancers",
        "patients": [
          {
            "id": "1"
          },
          {
            "id": "2"
          }
        ]
      },
      {
        "id": "2",
        "name": "Refractory Celiacs",
        "patients": [
          {
            "id": "3"
          },
          {
            "id": "4"
          },
          {
            "id": "5"
          }
        ]
      }
    ]
  }
}
```

## Mutation Resolvers

Since the query validation does a lot of the type checking and required attributes checks. The
resolvers for the mutation resolvers can be pretty simple.

```js
const resolvers = {
  ...
  Mutation: {
      createStudy: async (root, {input}, {db}) => {
          const session = await db.session();
          const result = await session.insert(input).into('Studies').commit();
          session.close();
          return result;
      },
      createPatient: async (root, {input}, {db}) => {
          const session = await db.session();
          const result = await session.insert(input).into('Patients').commit();
          session.close();
          return result;
      },
      createBiopsy: async (root, {input}, {db}) => {
          const session = await db.session();
          const result = await session.insert(input).into('Biopsies').commit();
          session.close();
          return result;
      },
  }
};
```

This would allows us to create a new Study as follows

```graphql
mutation {
  createStudy(input: {name: "study"}) {
    name
    id
  }
}
```

And then to add a patient to a study

```graphql
mutation {
  createPatient(input: {studyId: 1, patientStudyId: "P1"}) {
    patientStudyId
    id
    study {
      name
    }
  }
}
```

[Up Next: Part7: Query Filters](queryFilters.md)
