"use strict";
/**
* @author Raviel Chausse Silveira
*/

const Context = require('./context');

module.exports = class AccountGroupContext extends Context {

    constructor() {
        super('AccountGroup', 'agr_account_groups', 'agr_id');
    }

    list (filter = []) {
        return new Promise((accept, reject) => {
            let query = `
            SELECT * FROM agr_account_groups
            `;
            this.get(query, filter).then(accept).catch(reject);
        });
    }

    save (accountGroup) {
        return new Promise((accept, reject) => {
            let query = `
            UPDATE agr_account_groups SET agr_name = ? WHERE agr_id = ?;
            `;
            let params = [accountGroup.agr_name, accountGroup.agr_id];
            this.update(query, params).then(accept).catch(reject);
        });
    }

    store (accountGroup) {
        return new Promise((accept, reject) => {
            let query = `
                INSERT INTO agr_account_groups (agr_name) VALUES (?);
            `;
            let params = [accountGroup.agr_name];
            this.insert(query, params).then(accept).catch(reject);
        });
    }
}
