"use strict";
/**
* @author Raviel Chausse Silveira
*/

const LookupContext = require('../context/lookup.js');

module.exports = {

    index (req, res) {
        let context = new LookupContext();
        context.list()
        .then((lookupLst) => res.status(200).json(lookupLst))
        .catch($mixin.throwException);
    }
}
