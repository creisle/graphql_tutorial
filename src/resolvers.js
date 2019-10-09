const data = require('./repo/data.json');

const resolvers = {
    Query: {
        getStudies: () => [...data.Studies],
        getPatients: () => [...data.Patients],
        getBiopsies: () => [...data.Biopsies]
    }
}

module.exports = resolvers;