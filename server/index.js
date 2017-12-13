"use strict";
/**
* @author Raviel Chausse Silveira
*/

const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
global.$env = process.env;
const { NODE_PORT } = $env;

global.$mixin = require("./mixin");

global.$consign = require("consign");
global.$moment = require("moment");
require("moment-precise-range-plugin");

global.$path = require("path");
global.BASE_PATH = $path.resolve(__dirname, "./")
global.APP_PATH = $path.join(BASE_PATH, "/app");

const app = require(APP_PATH);

app.listen(NODE_PORT, () => console.log("Servidor rodando na porta %s.", NODE_PORT) );
