const fs = require('fs');
const _ = require('lodash');
const md5 = require('md5');
const Promise = require('bluebird');
const BasicStrategy = require('passport-http').BasicStrategy;
const registry = require('core/server/registry');
const utils = require('core/server/utils');
const config = registry.get('config');
const logger = registry.get('logger');

module.exports = {
    getStrategy
};

function getHtpasswd(file) {
    let accounts;

    return new Promise((resolve) => {
        fs.readFile(file, (err, data) => {
            logger.debug(`Basic authentication with file: ${ file }`);

            if (err) {
                logger.error(err);
                accounts = [];
                resolve(accounts);
            } else {
                data = _.trim(data.toString());
                accounts = _.map(data.split('\n'), (row) => {
                    row = row.split(':');
                    return {
                        username: row[0],
                        password: row[1]
                    };
                });
                resolve(accounts);
            }
        });
    });
}

function getStrategy() {
    const filename = utils.convertProjectRelativePathToAbsolute(config.get('authentication').file);

    return new BasicStrategy((username, password, done) => {
        getHtpasswd(filename)
        .then((accounts) => {
            const account = _.find(accounts, { username });
            const authenticated = account && account.password === md5(password);

            if (authenticated) {
                done(null, account);
            } else {
                done(null, false);
            }
        });
    });
}
