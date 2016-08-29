const registry = require('core/server/registry');
const query = require('./server/query.project');
const promisehub = registry.get('promisehub');
const Promise = require('bluebird');

// Load APIs
require('./server/api.project.create');
require('./server/api.project.get');
require('./server/api.project.update');
require('./server/api.project.delete');

// Register promisehub endpoints
promisehub.register('/rest/projects', options => new Promise((resolve, reject) => {
    if (options.req.isAuthenticated()) {
        query.getAll(options.req.user._id).then(projects => {
            resolve({
                data: projects
            });
        });
    } else {
        resolve({
            data: []
        });
    }
}));
