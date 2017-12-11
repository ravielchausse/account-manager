"use strict";
/**
* @author Raviel Chausse Silveira
*/

const JwtAuthModel = require('../model/jwt-auth.js');
const UserModel = require('../model/user.js');

module.exports = {
    
    index (req, res, next) {
        let jwtauth = new JwtAuthModel(req.headers.authorization);
        jwtauth.check().then(check => check ? next() : res.status(401) );
    },

    login (req, res) { 

        let header = { 
            alg: 'HS256', 
            typ: 'JWT',
            iss: req.headers.origin
        };

        let { Name, Login, Email, Password } = req.body;
        
        let payload = { user: new UserModel(Name, Login, Email) };
        
        let jwtauth = new JwtAuthModel(header, payload);

        jwtauth.build().then(token => res.status(200).json({ id_token: token })).catch($mixin.throwException);
	}
}
