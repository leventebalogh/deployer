const registry = require('core/server/registry');
const Projects = require('./model.project');
const needsAuthenticate = registry.get('middleware:authenticate');
const apiRouter = registry.get('apiRouter');
const logger = registry.get('logger');

apiRouter.delete('/projects/:id', needsAuthenticate(), (req, res) => {
    Projects.remove({ _id: req.params.id, owner: req.user._id })
    .then(() => {
        res.json({
            success: true
        });
    })
    .catch(error => {
        logger.debug(`[deployer] - [DELETE] projects/${req.params.id}`, error);

        res
        .status(501)
        .json({
            error: 'Could not delete project.'
        });
    });
});
