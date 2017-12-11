"use strict";
/**
* @author Raviel Chausse Silveira
*/

const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const express = require('express');
const exp = express();
const cors = require("cors");
const http = require("http");

exp.use(cors());

exp.use(bodyParser.json({limit: "5mb"}));
exp.use(bodyParser.urlencoded({limit: "5mb", extended: true}));

exp.use(expressValidator());

exp.set("json spaces", 4);

exp.use((req, res, next) => next() );

$consign({ cwd: APP_PATH }).include("/middleware").then("/router.js").into(exp);

module.exports = http.createServer(exp);
