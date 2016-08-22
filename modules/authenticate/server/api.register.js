const jsonParser = require('body-parser').json();
const registry = require('core/server/registry');
const utils = require('./utils');
const apiRouter = registry.get('apiRouter');
const logger = registry.get('logger');
const config = registry.get('config');

apiRouter.post(getApiUrl(), jsonParser, checkIfEnabled, (req, res) => {
    const UserModel = utils.getUserModel();
    const user = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordConfirmation: req.body.passwordConfirmation
    });

    logger.info('[authentication] - Registration attempt', req.body);

    user.save((err, newUser) => {
        if (err) {
            res.json(getErrorObject(err.message));
        } else {
            req.logIn(newUser, loginError => {
                if (loginError) {
                    return res.json(getErrorObject(loginError.message));
                }

                return res.json(utils.getAuthObject(req));
            });
        }
    });
});

function getApiUrl() {
    const url = config.get('authentication.registration.apiUrl');
    const baseUrl = config.get('apiBaseUrl');

    return url.replace(baseUrl, '');
}

function checkIfEnabled(req, res, next) {
    if (!config.get('authentication.registration.enabled')) {
        res.json(getErrorObject('Registration is not enabled.'));
    } else {
        next();
    }
}

function getErrorObject(error) {
    return {
        loggedIn: false,
        error
    };
}
