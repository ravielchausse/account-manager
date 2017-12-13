"use strict";
/**
* @author Raviel Chausse Silveira
*/

const Context = require('./context');

module.exports = class UserContext extends Context {

    constructor() {
        super('User', 'use_users', 'use_id');
    }

    list (filter = []) {
        return new Promise((accept, reject) => {
            let query = `
            SELECT * FROM use_users
            `;
            this.get(query, filter).then(accept).catch(reject);
        });
    }

    save (user) {
        return new Promise((accept, reject) => {
            let query = `
            UPDATE use_users SET use_name = ? WHERE use_id = ?;
            `;
            let params = [user.use_name, user.use_id];
            this.update(query, params).then(accept).catch(reject);
        });
    }

    store (user) {
        return new Promise((accept, reject) => {
            let query = `
                INSERT INTO use_users (use_name, use_login, use_email) VALUES (?,?,?);
            `;
            let params = [user.use_name, user.use_login, user.use_email];
            this.insert(query, params).then(accept).catch(reject);
        });
    }
}
