'use strict';

const errors = require('./errors');
const registry = {};

/* eslint-disable object-shorthand */
module.exports = {
    add: add,
    get: get
};
/* eslint-enable object-shorthand */

function add(name, value) {
    if (registry[name]) {
        throw new errors.DuplicateRegistrationError(
            `The following service is already registered: ${name}`
        );
    }
    registry[name] = value;
}

function get(name) {
    return registry[name];
}
