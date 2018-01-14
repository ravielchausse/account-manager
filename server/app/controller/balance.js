"use strict";
/**
* @author Raviel Chausse Silveira
*/

const BalanceModel = require('../model/balance.js');
const BalanceContext = require('../context/balance.js');

module.exports = {
	index (req, res) { 
        let context = new BalanceContext();
        context.list()
        .then((balanceLst) => res.status(200).json(balanceLst))
        .catch($mixin.throwException);
    },

    store (req, res) {
        let balance = new BalanceModel();

        balance.bal_id_accounts_type = req.body.acc_id;
        balance.bal_id_account_groups = req.body.agr_id;
        balance.bal_id_payment_methods = req.body.pay_id;
        balance.bal_id_payment_terms = req.body.pat_id;
        balance.bal_id_priorities = req.body.pri_id;
        balance.bal_id_purchasers = req.body.pur_id;
        balance.bal_id_skills = req.body.ski_id;

        balance.bal_account = req.body.bal_account;
        balance.bal_comments = req.body.bal_comments;
        balance.bal_date = req.body.bal_date;
        balance.bal_value = req.body.bal_value.replace(',', '.');

        let context = new BalanceContext();
        context.store(balance)
        .then((id) => { res.status(201).json({ id }) })
        .catch($mixin.throwException);
    }
}
