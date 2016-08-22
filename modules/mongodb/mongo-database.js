const mongoose = require('mongoose');
const registry = require('core/server/registry');
const logger = registry.get('logger');

module.exports = class MongoDatabase {
    constructor(config) {
        this.config = config;
        this.connect();
    }

    connect() {
        try {
            logger.info(`Connecting to MongoDB at ${this.config.url}`);
            this.connection = mongoose.connect(this.config.url);
        } catch (e) {
            logger.error(e.message);
        }
    }

    model(name, schema) {
        return this.connection.model(name, schema);
    }
};
