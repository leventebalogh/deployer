#!/usr/bin/env node
'use strict';

// Catch errors and print the stack nicely
/* eslint-disable global-require, no-console */
process.on('uncaughtException', (err) => {
    const chalk = require('chalk');
    console.log(chalk.red(err.stack));
    process.exit(1);
});
/* eslint-enable global-require, no-console */
const express = require('express');
const path = require('path');
const _ = require('lodash');
const EventEmitter = require('events').EventEmitter;

// Add our project folder to the Node module search path
require('app-module-path').addPath(path.resolve(__dirname, '../../'));

// Load core dependencies
const registry = require('core/server/registry');
const Config = require('core/server/config');
const utils = require('core/server/utils');
const logger = require('core/server/logger');
const Timer = require('core/server/timer');
const PromiseHub = require('core/server/promisehub');
const reactRender = require('core/server/react-render');

// Initialize parameters
const configObject = require('config/config');
const config = new Config(configObject);
const app = express();
const apiRouter = express.Router();
const port = config.get('port', 8080);
const apiBaseUrl = config.get('apiBaseUrl', '/rest');
const assetsBaseUrl = config.get('assetsBaseUrl', '/public/assets');
const buildBaseUrl = config.get('buildBaseUrl', '/public/dist');
logger.setLevel(config.get('loglevel', 'debug'));

// Register basic services
registry.add('events', new EventEmitter());
registry.add('promisehub', new PromiseHub());
registry.add('timer', new Timer());
registry.add('app', app);
registry.add('apiRouter', apiRouter);
registry.add('config', config);
registry.add('logger', logger);

// Middlewares
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));

// Load Modules
loadModules();

// Start the server
app.use(apiBaseUrl, apiRouter);
app.use(buildBaseUrl, express.static(utils.getPublicDirectory()));
app.use(assetsBaseUrl, express.static(utils.getAssetsDirectory()));
app.get('*', reactRender);
app.listen(port, () => {
    logger.if(utils.isDevMode()).warning('Server is running in development mode.');
    logger.info(`Server is listening on 127.0.0.1:${port}`);
});

/* eslint-disable global-require */
function loadModules() {
    _.each(config.get('modules'), (module) => {
        require(`modules/${module}/main`);
        logger.info('module loaded', { module });
    });
}
/* eslint-enable global-require */

