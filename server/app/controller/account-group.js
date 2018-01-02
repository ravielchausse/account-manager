"use strict";
/**
* @author Raviel Chausse Silveira
*/

const AccountGroupModel = require('../model/account-group.js');
const AccountGroupContext = require('../context/account-group.js');

module.exports = {
	index (req, res) { 
        let context = new AccountGroupContext();
        context.list()
        .then((accountGroupLst) => res.status(200).json(accountGroupLst))
        .catch($mixin.throwException);
    },

    store (req, res) {
        let accountGroup = new AccountGroupModel(req.body.agr_name);
        let context = new AccountGroupContext();
        context.store(accountGroup)
        .then((id) => { res.status(201).json({ id }) })
        .catch($mixin.throwException);
    }
}
