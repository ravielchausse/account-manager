"use strict";
/**
* @author Raviel Chausse Silveira
*/

const Context = require('./context');

module.exports = class LookupContext extends Context {

    constructor() {
        super('Lookup');
    }

    list (filter = []) {
        return new Promise((accept, reject) => {
            let query = `
            SELECT * FROM acc_accounts_type;
            SELECT * FROM pat_payment_terms;
            SELECT * FROM pay_payment_methods;
            SELECT * FROM pri_priorities;
            SELECT * FROM pur_purchasers;
            SELECT * FROM ski_skills;
            `;
            this.get(query, filter).then(results => {
                accept({
                    accountTypeLst: results[0],
                    paymentTermLst: results[1],
                    paymentMethodLst: results[2],
                    priorityLst: results[3],
                    purchaserLst: results[4],
                    skillLst: results[5]
                });
            }).catch(reject);
        });
    }
}
