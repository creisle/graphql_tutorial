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

module.exports = resolvers;