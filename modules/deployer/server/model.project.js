const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

module.exports = mongoose.model('Project', getProjectSchema());

function getProjectSchema() {
    const ProjectSchema = new mongoose.Schema({
        name: { type: String, required: true, unique: true },
        repoLocation: { type: String, required: [true, 'Repo location is required.'] },
        serverLocation: { type: String, required: [true, 'Server location is required.'] },
        serverWorkingDirectory: { type: String, required: [true, 'Server working directory is required'] },
        owner: { type: String, required: true },
        commands: String,
        createdAt: Date,
        updatedAt: Date
    });

    ProjectSchema.pre('save', function ProjectPreSave(next) {
        const project = this;

        setDates(project);
        next();
    });

    ProjectSchema.plugin(uniqueValidator, { message: 'Expected {PATH} to be unique.' });

    return ProjectSchema;
}


function setDates(project) {
    const date = new Date();

    project.updatedAt = date;

    if (!project.createdAt) {
        project.createdAt = date;
    }
}