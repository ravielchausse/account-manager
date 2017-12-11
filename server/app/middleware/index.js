"use strict";
/**
* @author Raviel Chausse Silveira
*/

const AuthController = require('../controller/auth.js');

module.exports = (app) => {
    app.use("/user", AuthController.index);
};
