const _ = require('lodash');
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
                // Set loaded property on the state objects
                if (options.loaded) {
                    value.loaded = true;
                }

                // Extend value with a pre-defined object
                if (options.extend) {
                    value = _.assign(value, options.extend);
                }

                // Wrap value in an object, required for setting up the Redux state
                if (options.stateProperty) {
                    value = _.set({}, options.stateProperty, value);
                }


                return value;
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
