'use strict';
const util = require('util');

const ConfigFormatError = subclassError('ConfigFormatError');
const ConfigParseError = subclassError('ConfigParseError');
const DuplicateRegistrationError = subclassError('DuplicateRegistrationError');

module.exports = {
    ConfigFormatError,
    ConfigParseError,
    DuplicateRegistrationError
};

function subclassError(name) {
    const error = function error(message) {
        Error.call(this);
        Error.captureStackTrace(this);
        this.name = name;
        this.message = message;
    };
    util.inherits(error, Error);
    return error;
}
