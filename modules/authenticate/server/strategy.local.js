const utils = require('./utils');
const coreUtils = require('core/server/utils');
const LocalStrategy = require('passport-local').Strategy;
const registry = require('core/server/registry');
const logger = registry.get('logger');

module.exports = {
    getStrategy,
    serializeUser,
    deserializeUser
};

function serializeUser(user, done) {
    done(null, user._id);
}

function deserializeUser(id, done) {
    utils.getUserModel().findById(id, (err, user) => {
        done(null, user);
    });
}

function getStrategy() {
    return new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        localAuthenticationMethod
    );
}

function localAuthenticationMethod(username, password, done) {
    const Model = utils.getUserModel();

    Model.findOne({ username }, (err, user) => {
        if (err) {
            logger.info('[authentication] - Error when finding by username', err);
            return done(null, false, { message: 'Unknown error.' });
        }

        if (!user) {
            logger.info(`[authentication] - User "${username}" does not exist`);
            return done(null, false, { message: 'User does not exist.' });
        }

        if (coreUtils.hash(password) !== user.password) {
            logger.info(`[authentication] - Wrong password for "${username}"`);
            return done(null, false, { message: 'Wrong password.' });
        }

        return done(null, user);
    });
}
