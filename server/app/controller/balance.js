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

    getById (req, res) {
        let context = new BalanceContext();
        context.getById(req.params.id)
        .then((balance) => res.status(200).json(balance))
        .catch($mixin.throwException);
    },

    store (req, res) {
        let balance = new BalanceModel();

        balance.build(req.body);

        let context = new BalanceContext();
        context.store(balance)
        .then((id) => { res.status(201).json({ id }) })
        .catch($mixin.throwException);
    },

    edit (req, res) {
        let balance = new BalanceModel();

        balance.build(req.body);

        let context = new BalanceContext();
        context.edit(req.params.id, balance)
        .then((update) => { res.status(201).json({ update }) })
        .catch($mixin.throwException);
    }
}
