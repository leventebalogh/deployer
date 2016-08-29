const registry = require('core/server/registry');
const query = require('./server/query.project');
const promisehub = registry.get('promisehub');

// Load APIs
require('./server/api.project.create');
require('./server/api.project.get');
require('./server/api.project.update');
require('./server/api.project.delete');
