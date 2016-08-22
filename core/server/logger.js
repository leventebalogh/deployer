'use strict';

const winston = require('winston');
const _ = require('lodash');
const consoleTransport = new (winston.transports.Console)({
        timestamp: true,
        colorize: true,
        handleExceptions: true,
        level: 'debug'
});
const mainLogger = new (winston.Logger)({
        transports: [consoleTransport]
});

/* eslint-disable prefer-rest-params */
module.exports = {
    log: function log(level) {
        const args = [].slice.call(arguments, 1);
        if (this.enable) {
            mainLogger.log(level, ...args);
        }
        return this;
    },
    debug: function debug() {
        return this.log('debug', ...arguments);
    },
    info: function info() {
        return this.log('info', ...arguments);
    },
    warning: function warning() {
        return this.log('warn', ...arguments);
    },
    error: function error() {
        return this.log('error', ...arguments);
    },
    if: function logIf(expression) {
        expression = Boolean(expression);
        return _.extend({}, this, { enable: expression });
    },
    setLevel: function setLevel(level) {
        mainLogger.transports.console.level = level;
        return this;
    },
    enable: true
};
