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
    patients: [Patient]
}

type Patient {
    id: ID
    study: Study
    sex: String
    age: Int
    biopsies: [Biopsy]
}

type Biopsy {
    id: ID
    patient: Patient
    biopsyDate: Date
    diagnosis: String
}

input NameComparison {
    name: String!
    operator: String
}

input Clause {
    OR: [NameComparison!]!
}

type Query {
    getStudies(name: String, limit: Int, skip: Int, filters: Clause): [Study]
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

type Mutation {
    createStudy(input: StudyInput): Study
    deleteStudy(id: ID): Study

    createPatient(input: PatientInput): Patient
    deletePatient(id: ID): Patient

    createBiopsy(input: BiopsyInput): Biopsy
    deleteBiopsy(id: ID): Biopsy
}
`;

module.exports = typeDefs;