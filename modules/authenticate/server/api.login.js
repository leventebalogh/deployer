const passport = require('passport');
const jsonParser = require('body-parser').json();
const registry = require('core/server/registry');
const apiRouter = registry.get('apiRouter');
const config = registry.get('config');

// @todo leventebalogh 2016-08-13 Set up proper logging.
apiRouter.post(getApiUrl(), jsonParser, checkIfEnabled, (req, res, next) => {
    passport.authenticate('local', (authErr, user, info) => {
        if (authErr) {
            return res.json(getErrorObject());
        }

        if (!user) {
            return res.json(getErrorObject());
        }

        req.logIn(user, loginError => {
            if (loginError) {
                return res.json(getErrorObject());
            }

            return res.json(getSuccessObject(info));
        });
    })(req, res, next);
});

function getApiUrl() {
    const url = config.get('authentication.login.apiUrl');
    const baseUrl = config.get('apiBaseUrl');

    return url.replace(baseUrl, '');
}

function checkIfEnabled(req, res, next) {
    if (!config.get('authentication.login.enabled')) {
        res.json(getErrorObject('Login is not enabled.'));
    } else {
        next();
    }
}

function getErrorObject(message) {
    return {
        success: false,
        loggedIn: false,
        error: message || 'Incorrect username or password.'
    };
}

function getSuccessObject(userObject) {
    return {
        success: true,
        loggedIn: true,
        user: userObject
    };
}
