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
            SELECT * FROM pay_payment_methods;
            SELECT * FROM pri_priorities;
            SELECT * FROM pur_purchasers;
            SELECT * FROM ski_skills;
            `;
            this.get(query, filter).then(results => {
                accept({
                    paymentLst: results[0],
                    priorityLst: results[1],
                    purchaserLst: results[2],
                    skillLst: results[3]
                });
            }).catch(reject);
        });
    }
}
