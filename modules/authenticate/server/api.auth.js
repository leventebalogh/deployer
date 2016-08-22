const registry = require('core/server/registry');
const apiRouter = registry.get('apiRouter');
const utils = require('./utils');

apiRouter.get('/auth', (req, res) => {
    res.json(utils.getAuthObject(req));
});
