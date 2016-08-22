'use strict';

module.exports = class Timer {
    constructor() {
        this.registry = {};
        this.precision = 3;
        this.defaultKey = 'default';
    }

    start(key) {
        key = key || this.defaultKey;
        this.registry[key] = process.hrtime();
        return this.registry[key];
    }

    end(key) {
        key = key || this.defaultKey;
        const start = this.registry[key];
        const elapsed = this.convertNanoToMilliseconds(process.hrtime(start)[1]);
        const elapsedFixedPrecision = elapsed.toFixed(this.precision);
        delete this.registry[key];
        return elapsedFixedPrecision;
    }

    convertNanoToMilliseconds(timestamp) {
        return timestamp / 1000000;
    }
};
