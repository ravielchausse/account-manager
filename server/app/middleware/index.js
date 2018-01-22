"use strict";
/**
* @author Raviel Chausse Silveira
*/

const AuthController = require('../controller/auth.js');

const BalanceMiddleware = require('./balance.js');

module.exports = (app) => {
    // app.use("/user", AuthController.index);
    app.get("/balance", BalanceMiddleware.index);
};
