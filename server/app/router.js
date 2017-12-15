"use strict";
/**
* @author Raviel Chausse Silveira
*/

let AuthController = require('./controller/auth.js');
let LookupController = require('./controller/lookup.js');
let UserController = require('./controller/user.js');

module.exports = (app) => {

    app.get("/", (req, res) => { res.status(200).send("<strong>Bem vindo ao Node Service Engine!<strong>") });
    app.post("/auth", AuthController.login);

    app.get("/lookup", LookupController.index);
    app.post("/lookup", LookupController.index);

    app.get("/user", UserController.index);
    app.post("/user", UserController.store);
    
};
