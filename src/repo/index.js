const fs = require('fs');

const {Query, Insert, current} = require('./db');




class Session {
    constructor() {
        if (fs.existsSync(current)) {
            this.data = JSON.parse(fs.readFileSync(current));
        } else {
            this.data = require('./data');
        }
    }

    query(tablename) {
        return new Query(this, tablename);
    }

    insert(data) {
        return new Insert(this, data);
    }

    async close() {}

}

module.exports = {
    session: async () => new Session(), current
};