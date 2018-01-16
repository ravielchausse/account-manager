"use strict";
/**
* @author Raviel Chausse Silveira
*/

module.exports = class Balance {
    constructor () {
        this.bal_id_accounts_type = null;
        this.bal_id_account_groups = null;
        this.bal_id_payment_methods = null;
        this.bal_id_payment_terms = null;
        this.bal_id_priorities = null;
        this.bal_id_purchasers = null;
        this.bal_id_skills = null;
        
        this.bal_id = null;
        this.bal_account = null;
        this.bal_comments = null;
        this.bal_date = null;
        this.bal_value = null;
        this.bal_created_at = null;
	}

    build (payload) {
        this.bal_id_accounts_type = payload.acc_id;
        this.bal_id_account_groups = payload.agr_id;
        this.bal_id_payment_methods = payload.pay_id;
        this.bal_id_payment_terms = payload.pat_id;
        this.bal_id_priorities = payload.pri_id;
        this.bal_id_purchasers = payload.pur_id;
        this.bal_id_skills = payload.ski_id;

        this.bal_account = payload.bal_account;
        this.bal_comments = payload.bal_comments;
        this.bal_date = payload.bal_date;
        this.bal_value = Number(payload.bal_value.replace(',', ''));
    }
}
