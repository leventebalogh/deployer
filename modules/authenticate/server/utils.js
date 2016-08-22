const passport = require('passport');
const _ = require('lodash');
const User = require('./user.model');
const registry = require('core/server/registry');
const config = registry.get('config');

module.exports = {
    getUserModel,
    authenticate,
    registerUsersModelIfNeeded,
    getAuthObject
};

function getUserModel() {
    let modelName = config.get('authentication.model', 'default');

    if (modelName === 'default') {
        modelName = 'User';
    }

    return registry.get(`database:model:${modelName}`);
}

function authenticate(type) {
    if (type === 'basic') {
        return passport.authenticate('basic', { session: false });
    }

    return function localAuthentication(req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect(config.get('authentication.login.url', '/login'));
        }
    };
}

function registerUsersModelIfNeeded() {
    if (config.get('authentication.model', 'default') === 'default') {
        registry.add('database:model:User', User);
    }
}

// @todo 2016-07-03 Password is not removed from the user object
function getAuthObject(req) {
    if (req.isAuthenticated()) {
        return {
            loaded: true,
            loggedIn: true,
            user: _.pick(req.user, ['username', 'email'])
        };
    }

    return {
        loaded: true,
        loggedIn: false
    };
}
