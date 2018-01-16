"use strict";
/**
* @author Raviel Chausse Silveira
*/

const Context = require('./context');

module.exports = class BalanceContext extends Context {

    constructor() {
        super('Balance', 'bal_balance_sheets', 'bal_id');
    }

    getById (id) {
        return new Promise((accept, reject) => {
            let query = `
                SELECT bal_id,
                    bal_date, bal_account,
                    bal_value, bal_comments,
                    acc_id, acc_name,
                    agr_id, agr_name,
                    pay_id, pay_name,
                    pat_id, pat_name,
                    pri_id, pri_name,
                    pur_id, pur_name,
                    ski_id, ski_value
                FROM bal_balance_sheets
                INNER JOIN acc_accounts_type ON acc_id = bal_id_accounts_type
                INNER JOIN agr_account_groups ON agr_id = bal_id_account_groups
                INNER JOIN pay_payment_methods ON pay_id = bal_id_payment_methods
                INNER JOIN pat_payment_terms ON pat_id = bal_id_payment_terms
                INNER JOIN pri_priorities ON pri_id = bal_id_priorities
                INNER JOIN pur_purchasers ON pur_id = bal_id_purchasers
                INNER JOIN ski_skills ON ski_id = bal_id_skills
                WHERE bal_id = ?
            `;
            this.getOne(query, [id]).then(accept).catch(reject);
        });
    }

    list (filter = []) {
        return new Promise((accept, reject) => {
            let query = `
                SELECT bal_id,
                    bal_date, bal_account,
                    bal_value, bal_comments,
                    acc_id, acc_name,
                    agr_id, agr_name,
                    pay_id, pay_name,
                    pat_id, pat_name,
                    pri_id, pri_name,
                    pur_id, pur_name,
                    ski_id, ski_value
                FROM bal_balance_sheets
                INNER JOIN acc_accounts_type ON acc_id = bal_id_accounts_type
                INNER JOIN agr_account_groups ON agr_id = bal_id_account_groups
                INNER JOIN pay_payment_methods ON pay_id = bal_id_payment_methods
                INNER JOIN pat_payment_terms ON pat_id = bal_id_payment_terms
                INNER JOIN pri_priorities ON pri_id = bal_id_priorities
                INNER JOIN pur_purchasers ON pur_id = bal_id_purchasers
                INNER JOIN ski_skills ON ski_id = bal_id_skills
            `;
            this.get(query, filter).then(accept).catch(reject);
        });
    }

    store (balance) {
        return new Promise((accept, reject) => {
            let query = `
                INSERT INTO bal_balance_sheets 
                (
                    bal_id_account_groups,
                    bal_id_accounts_type,
                    bal_id_payment_methods,
                    bal_id_payment_terms,
                    bal_id_priorities,
                    bal_id_purchasers,
                    bal_id_skills,
                    bal_account,
                    bal_comments,
                    bal_date,
                    bal_value
                ) 
                VALUES (?,?,?,?,?,?,?,?,?,?,?);
            `;
            let params = [
                balance.bal_id_account_groups,
                balance.bal_id_accounts_type,
                balance.bal_id_payment_methods,
                balance.bal_id_payment_terms,
                balance.bal_id_priorities,
                balance.bal_id_purchasers,
                balance.bal_id_skills,
                balance.bal_account,
                balance.bal_comments,
                balance.bal_date,
                balance.bal_value
            ];
            this.insert(query, params).then(accept).catch(reject);
        });
    }

    edit (id, balance) {
        return new Promise((accept, reject) => {
            let query = `
                UPDATE account_manager.bal_balance_sheets
                SET
                    bal_id_account_groups = ?,
                    bal_id_accounts_type = ?,
                    bal_id_payment_methods = ?,
                    bal_id_payment_terms = ?,
                    bal_id_priorities = ?,
                    bal_id_purchasers = ?,
                    bal_id_skills = ?,
                    bal_account = ?,
                    bal_comments = ?,
                    bal_date = ?,
                    bal_value = ?
                WHERE bal_id = ?
            `;
            let params = [
                balance.bal_id_account_groups,
                balance.bal_id_accounts_type,
                balance.bal_id_payment_methods,
                balance.bal_id_payment_terms,
                balance.bal_id_priorities,
                balance.bal_id_purchasers,
                balance.bal_id_skills,
                balance.bal_account,
                balance.bal_comments,
                balance.bal_date,
                balance.bal_value,
                id
            ];
            this.update(query, params).then(accept).catch(reject);
        });
    }
}
