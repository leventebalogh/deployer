'use strict';

const registry = require('core/server/registry');
const MongoDatabase = require('./mongo-database');
const config = registry.get('config');
const mongoDatabase = new MongoDatabase(config.get('mongodb'));
registry.add('database:mongodb', mongoDatabase);
