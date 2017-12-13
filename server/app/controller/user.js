"use strict";
/**
* @author Raviel Chausse Silveira
*/

const JwtAuthModel = require('../model/jwt-auth.js');
const UserModel = require('../model/user.js');
const UserContext = require('../context/user.js');

module.exports = {
	index (req, res) { 
        let context = new UserContext();
        context.list()
        .then((userLst) => res.status(200).json(userLst))
        .catch($mixin.throwException);
    },

    store (req, res) {
        let { use_name, use_login, use_email, use_password } = req.body;
        let user = new UserModel(use_name, use_login, use_email);
        let context = new UserContext();
        context.store(user)
        .then((id) => res.status(201).send(id))
        .catch($mixin.throwException);
    }
}
