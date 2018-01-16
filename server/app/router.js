"use strict";
/**
* @author Raviel Chausse Silveira
*/

const AccountGroupController = require('./controller/account-group.js');
const AuthController = require('./controller/auth.js');
const BalanceController = require('./controller/balance.js');
const LookupController = require('./controller/lookup.js');
const UserController = require('./controller/user.js');

module.exports = (app) => {

    app.get("/", (req, res) => { res.status(200).send("<strong>Bem vindo ao Node Service Engine!<strong>") });
    app.post("/auth", AuthController.login);

    app.get("/lookup", LookupController.index);
    app.post("/lookup", LookupController.index);

    app.get("/user", UserController.index);
    app.post("/user", UserController.store);

    app.get("/account-group", AccountGroupController.index);
    app.post("/account-group", AccountGroupController.store);

    app.get("/balance", BalanceController.index);
    app.get("/balance/:id", BalanceController.getById);
    app.post("/balance", BalanceController.store);    
};
