const registry = require('core/server/registry');

module.exports = class PromiseHub {
    constructor() {
        this.registry = {};
    }

    call(key, options = {}) {
        // @todo leventebalogh
        // This is not available when this is file is called
        const logger = registry.get('logger');
        const method = this.registry[key];
        const promise = method && method(options);

        if (!promise) {
            logger.error('PromiseHub: no method is registered for the key:', key);
            return false;
        }

        if (!promise.then) {
            logger.error('PromiseHub: method is not a promise for the key:', key);
            return false;
        }

        return promise
            .then((value) => {
                const obj = {};
                obj[options.stateProperty] = value;
                return obj;
            });
    }

    register(key, method) {
        if (this.registry[key]) {
            throw new Error('Key is already registered.');
        } else {
            this.registry[key] = method;
        }
    }
};
