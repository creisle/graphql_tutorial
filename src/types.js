const { gql } = require('apollo-server-express');

const typeDefs = gql`
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
`;

module.exports = typeDefs;