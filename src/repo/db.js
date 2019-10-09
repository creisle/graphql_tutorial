const fs = require('fs');
const path = require('path');

const current = path.join(__dirname, 'current.json');

class Query {
    constructor(session, table) {
        this.session = session;
        this.current = session.data[table];
    }

    where(opt = {}) {
        const result = this.current.filter((row) => {
            for (const [attr, value] of Object.entries(opt)) {
                if (row[attr] !== value && row[attr] !== undefined) {
                    return false;
                }
            }
            return true;
        });
        this.current = result;
        return this;
    }

    async all() {
        return [...this.current];
    }
}


class Insert {
    constructor(session, content) {
        this.session = session;
        this.content = content;
        this.table = null;
    }

    into(table) {
        this.table = table;
        return this;
    }

    async commit() {
        let id = Object.values(this.session.data[this.table]).length;
        const ids = new Set()
        for (const row of this.session.data[this.table]) {
            ids.add(row.id);
        }
        while (ids.has(`${id}`)) {
            id += 1
        }
        const row = {...this.content, id};
        this.session.data[this.table].push(row);

        fs.writeFileSync(current, JSON.stringify(this.session.data))
        return row;
    }
}


module.exports  = {Insert, Query, current};