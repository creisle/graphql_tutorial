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
    Query: {
        getStudies: async (root, {name, skip, limit}, {db}) => {
            const session = await db.session();

            let query = session.query('Studies');
            if (name) {
                query.where({name});
            }
            let result = await query.all();

            // NOTE: if this were an actual database you'd probably want to add limit/skip to the query itself
            if (skip) {
                result = result.slice(skip);
            }
            if (limit) {
                result = result.slice(0, limit);
            }
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
}

module.exports = resolvers;