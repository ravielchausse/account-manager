"use strict";
/**
* @author Raviel Chausse Silveira
*/

global.$mixin = require("./mixin");

global.$consign = require("consign");
global.$moment = require("moment");
require("moment-precise-range-plugin");

global.$path = require("path");
global.BASE_PATH = $path.resolve(__dirname, "./")
global.APP_PATH = $path.join(BASE_PATH, "/app");

let app = require(APP_PATH);

app.listen(3001, () => console.log("Servidor rodando na porta %s.", 3001) );
