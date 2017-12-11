"use strict";
/**
* @author Raviel Chausse Silveira
*/

const JwtAuthModel = require('../model/jwt-auth.js');
const UserModel = require('../model/user.js');

module.exports = {
	index (req, res) { 

    },

    store (req, res) {
        let header = { alg: 'HS256', typ: 'JWT' };

        let { Name, Login, Email, Password } = req.body;

        let payload = { user: new UserModel(Name, Login, Email) };
        
        let jwtauth = new JwtAuthModel(header, payload);

        jwtauth.build().then(token => res.status(201).json({ id_token: token })).catch($mixin.throwException);
    }
}
