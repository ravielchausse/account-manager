"use strict";
/**
* @author Raviel Chausse Silveira
*/

const base64url = require('base64url');
const crypto = require('crypto');

module.exports = class JwtAuth {

    constructor () {
        if (arguments.length === 1 && typeof arguments[0] === 'string') {
            this.Token = arguments[0];
        } else if (arguments.length === 2) {
            this.Header = base64url(JSON.stringify(arguments[0]));
            this.Payload = base64url(JSON.stringify(arguments[1]));
        } else {
            throw new Error("Invalid arguments");
        }
    }

    build () {
        return new Promise((resolve, reject) => {
            const hmac = crypto.createHmac('sha256', '540ef6d7c7799668837d3de7142e257c');
            hmac.on('readable', () => {
                const signature = hmac.read();
                if (signature) {
                    let authSignature = signature.toString('base64');
                    let token = this.Header + '.' + this.Payload + '.' + authSignature;
                    return resolve(token);
                }
                return reject('Signature is empty.');
            });
            hmac.write(this.Header + '.' + this.Payload);
            hmac.end();
        });
    }

    check () {
        return new Promise((resolve, reject) => {
            let { header, payload, signature } = this.destruct(reject);
            this.Header = header;
            this.Payload = payload;
            this.build().then(token => resolve(this.Token === token)).catch(reject);
        });
    }

    destruct (reject) {
        let arr = this.Token.split('.');
        if (arr.length === 3) {
            return { header: arr[0], payload: arr[1], signature: arr[2] };
        } else {
            reject("JWT Invalid");            
        }
    }
}
