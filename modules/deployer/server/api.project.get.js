const registry = require('core/server/registry');
const query = require('./query.project');
const needsAuthenticate = registry.get('middleware:authenticate');
const apiRouter = registry.get('apiRouter');
const logger = registry.get('logger');

apiRouter.get('/projects', needsAuthenticate(), (req, res) => {
    query.getAll(req.user._id).then((projects) => {
        res.json(projects);
    });
});

apiRouter.get('/projects/:id', needsAuthenticate(), (req, res) => {
    query.getSingle(req.params.id, req.user._id)
    .then((project) => {
        res.json(project);
    })
    .catch(error => {
        logger.debug(`[deployer] - projects/get/${req.params.id}`, error);

        res
        .status(404)
        .json({
            error: 'Project not found'
        });
    });
});
