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
            SELECT * FROM agr_account_groups;
            SELECT * FROM pay_payment_methods;
            SELECT * FROM pri_priorities;
            SELECT * FROM pur_purchasers;
            SELECT * FROM ski_skills;
            `;
            this.get(query, filter).then(results => {
                accept({
                    accountGroupLst: results[0],
                    paymentLst: results[1],
                    priorityLst: results[2],
                    purchaserLst: results[3],
                    skillLst: results[4]
                });
            }).catch(reject);
        });
    }
}
