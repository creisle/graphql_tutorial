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

type Query {
    getStudies: [Study]
    getStudy(id: ID): Study

    getPatients: [Patient]
    getPatient(id: ID): Patient

    getBiopsies: [Biopsy]
    getBiopsy(id: ID): Biopsy
}

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
`;

module.exports = typeDefs;