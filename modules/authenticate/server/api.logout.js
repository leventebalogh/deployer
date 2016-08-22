const registry = require('core/server/registry');
const apiRouter = registry.get('apiRouter');
const authenticate = registry.get('middleware:authenticate');
const config = registry.get('config');

apiRouter.get(getApiUrl(), authenticate(), (req, res) => {
    req.logout();
    res.redirect(getRedirectUrl());
});

function getApiUrl() {
    const url = config.get('authentication.logout.apiUrl');
    const baseUrl = config.get('apiBaseUrl');

    return url.replace(baseUrl, '');
}

function getRedirectUrl() {
    return config.get('authentication.logout.successRedirect', '/');
}
