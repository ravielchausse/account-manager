"use strict";
/**
* @author Raviel Chausse Silveira
*/

const Context = require('./context');

module.exports = class BalanceContext extends Context {

    constructor() {
        super('Balance', 'bal_balance_sheets', 'bal_id');
    }

    list (filter = []) {
        return new Promise((accept, reject) => {
            let query = `
            SELECT * FROM bal_balance_sheets
            `;
            this.get(query, filter).then(accept).catch(reject);
        });
    }

    save (balance) {
        return new Promise((accept, reject) => {
            let query = `
            UPDATE bal_balance_sheets SET bal_account = ? WHERE bal_id = ?;
            `;
            let params = [balance.bal_account, balance.bal_id];
            this.update(query, params).then(accept).catch(reject);
        });
    }

    store (balance) {
        return new Promise((accept, reject) => {
            let query = `
                INSERT INTO bal_balance_sheets 
                (
                    bal_id_skills,
                    bal_id_priorities,
                    bal_id_payment_methods,
                    bal_id_purchasers,
                    bal_date,
                    bal_account,
                    bal_value,
                    bal_continued,
                    bal_comments
                ) 
                VALUES (?,?,?,?,?,?,?,?,?);
            `;
            let params = [
                balance.bal_id_skills,
                balance.bal_id_priorities,
                balance.bal_id_payment_methods,
                balance.bal_id_purchasers,
                balance.bal_date,
                balance.bal_account,
                balance.bal_value,
                balance.bal_continued,
                balance.bal_comments
            ];
            this.insert(query, params).then(accept).catch(reject);
        });
    }
}
