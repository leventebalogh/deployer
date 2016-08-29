const Projects = require('./model.project');

module.exports = {
    getAll,
    getSingle
};

function getAll(userId) {
    return Projects.find({ owner: userId });
}

function getSingle(id, userId) {
    return Projects.find({ _id: id, owner: userId });
}
