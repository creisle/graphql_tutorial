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

module.exports = resolvers;