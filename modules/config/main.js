const Promise = require('bluebird');
const registry = require('core/server/registry');
const apiRouter = registry.get('apiRouter');
const config = registry.get('config');
const promisehub = registry.get('promisehub');

apiRouter.get('/config', (req, res) => res.json(config.client));
promisehub.register('/rest/config', () => Promise.resolve(config.client));
