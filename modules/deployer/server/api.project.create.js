const _ = require('lodash');
const registry = require('core/server/registry');
const camelCase = require('core/server/middlewares').camelCase;
const needsAuthenticate = registry.get('middleware:authenticate');
const apiRouter = registry.get('apiRouter');
const jsonParser = require('body-parser').json();
const ProjectModel = require('./model.project');
const logger = registry.get('logger');

apiRouter.post('/projects', jsonParser, camelCase, needsAuthenticate(), (req, res) => {
    const project = new ProjectModel({
        name: req.body.name,
        repoLocation: req.body.repoLocation,
        serverLocation: req.body.serverLocation,
        serverWorkingDirectory: req.body.serverWorkingDirectory,
        commands: req.body.commands,
        owner: req.user._id
    });

    logger.info('[deployer] - Creating project', req.body);

    project.save((err, newProject) => {
        if (err) {
            res
            .status(501)
            .json({
                error: getErrorMessage(err)
            });
        } else {
            res.json({
                id: newProject._id,
                name: newProject.name,
                repoLocation: newProject.repoLocation
            });
        }
    });
});

function getErrorMessage(err) {
    if (err.name !== 'ValidationError') {
        return 'Uknown error';
    }

    // Return with the first error message only
    const key = Object.keys(err.errors)[0];
    return err.errors[key].message;
}
