const _ = require('lodash');

module.exports = {
    camelCase
};

/**
 * Changes all keys in the `req.body` object to camelCase.
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
function camelCase(req, res, next) {
    if (req.body) {
        const newBody = {};
        _.each(req.body, (value, key) => { newBody[_.camelCase(key)] = value; });
        req.body = newBody;
    }

    next();
}


