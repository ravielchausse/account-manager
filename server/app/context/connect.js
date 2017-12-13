"use strict";
/**
* @author Raviel Chausse Silveira
*/

const mysql = require('mysql');

module.exports = () => {
    return mysql.createConnection({
        host: $env.DB_HOST,
        database: $env.DB_DATABASE,
        user: $env.DB_USERNAME,
        password: $env.DB_PASSWORD,
        multipleStatements: true
    });
}
