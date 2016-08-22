'use strict';

const argv = require('yargs').argv;
const _ = require('lodash');
const errors = require('./errors');

module.exports = class Config {
    constructor(config) {
        this.config = this.parseConfig(config);
        this.server = this.getServerConfig();
        this.client = this.getClientConfig();
    }

    parseConfig(config) {
        if (typeof config === 'string') {
            return this.parseStringConfig(config);
        } else if (typeof config === 'object') {
            return config;
        }

        throw new errors.ConfigFormatError(
            `Config has to be either an object or a string, current is "${typeof config}"`
        );
    }

    get(key, defaultValue) {
        const commandLineParameter = argv[key];

        if (commandLineParameter) {
            return commandLineParameter;
        }

        // This object is used only on the server side,
        // right now there is no need to be able to reach the
        // client-side config
        return _.get(this.server, key, defaultValue);
    }

    getAsObject() {
        return this.config;
    }

    getServerConfig() {
        return this.getSubConfig('server');
    }

    getClientConfig() {
        return this.getSubConfig('client');
    }

    getSubConfig(type) {
        const types = ['client', 'server'];
        const skippedTypes = _.without(types, type);
        let subConfig = {};

        _.forEach(this.config, (value, key) => {
            const shouldSkip = _.includes(skippedTypes, key);
            const shouldMerge = key === type;

            if (_.isPlainObject(value)) {
                if (shouldMerge) {
                    subConfig = _.assign(subConfig, value);
                } else if (shouldSkip) {
                    return;

                // Value is a module config with possibly containing
                // `client` and `server` subsections
                } else {
                    subConfig[key] = _(value)
                        .omit(types)
                        .assign(value[type])
                        .value();
                }
            } else {
                subConfig[key] = value;
            }
        });

        return subConfig;
    }

    parseStringConfig(string) {
        try {
            return JSON.parse(string);
        } catch (e) {
            throw new errors.ConfigParseError(
                `Could not parse config JSON string: "${e.message}", JSON string: "${string}"`
            );
        }
    }
};
