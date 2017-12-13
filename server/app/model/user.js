"use strict";
/**
* @author Raviel Chausse Silveira
*/

module.exports = class User {
    constructor () {
		this.use_name = arguments[0] || null;
		this.use_login = arguments[1] || null;
        this.use_email = arguments[2] || null;
		this.use_password = arguments[3] || null;
	}
}
