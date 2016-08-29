const _ = require('lodash');
const registry = require('core/server/registry');
const Projects = require('./model.project');
const needsAuthenticate = registry.get('middleware:authenticate');
const jsonParser = require('body-parser').json();
const apiRouter = registry.get('apiRouter');
const logger = registry.get('logger');

apiRouter.put('/projects/:id', jsonParser, needsAuthenticate(), (req, res) => {
    Projects.update(
        { _id: req.params.id, owner: req.user._id },
        getProjectObject(req),
        {
            runValidators: true
        }
    )
    .then(() => {
        res.json({
            success: true
        });
    })
    .catch(error => {
        logger.debug(`[deployer] - [PUT] projects/${req.params.id}`, error);

        res
        .status(501)
        .json({
            error: 'Could not update project.',
            error2: error
        });
    });
});

function getProjectObject(req) {
    const project = {
        name: req.body.name,
        repoLocation: req.body['repo-location'],
        serverLocation: req.body['server-location'],
        serverWorkingDirectory: req.body['server-working-directory'],
        commands: req.body.commands
    };

    return _.omitBy(project, _.isUndefined);
}