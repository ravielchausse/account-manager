"use strict";
/**
* @author Raviel Chausse Silveira
*/

const AuthController = require('./controller/auth.js');
const LookupController = require('./controller/lookup.js');
const UserController = require('./controller/user.js');
const BalanceController = require('./controller/balance.js');

module.exports = (app) => {

    app.get("/", (req, res) => { res.status(200).send("<strong>Bem vindo ao Node Service Engine!<strong>") });
    app.post("/auth", AuthController.login);

    app.get("/lookup", LookupController.index);
    app.post("/lookup", LookupController.index);

    app.get("/user", UserController.index);
    app.post("/user", UserController.store);

    app.get("/balance", BalanceController.index);
    app.post("/balance", BalanceController.store);    
};
