'use strict';

const path = require('path');
const fs = require('fs-extra');
const util = require('util');
const crypto = require('crypto');

module.exports = {
    isDevMode,
    getPublicDirectory,
    getAssetsDirectory,
    getModulesDirectory,
    getProjectRootPath,
    convertProjectRelativePathToAbsolute,
    getFileContentInProject,
    subclassError,
    captureStream,
    captureStdOut,
    captureStdErr,
    saveFile,
    hash
};

function isDevMode() {
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    return process.env.NODE_ENV !== 'production';
}

function getPublicDirectory() {
    return path.join(getProjectRootPath(), 'build', 'public');
}

function getAssetsDirectory() {
    return path.join(getProjectRootPath(), 'assets');
}

function getModulesDirectory() {
    return path.join(getProjectRootPath(), 'modules');
}

function getProjectRootPath() {
    return path.resolve(__dirname, '../../');
}

function convertProjectRelativePathToAbsolute(relPath) {
    return path.resolve(getProjectRootPath(), relPath);
}

function getFileContentInProject(filename) {
    return fs.readFileSync(convertProjectRelativePathToAbsolute(filename), 'utf8');
}

function captureStdOut() {
    return captureStream(process.stdout);
}

function captureStdErr() {
    return captureStream(process.stderr);
}

function captureStream(stream) {
    const oldWrite = stream.write;
    let buffer = '';
    stream.write = (chunk) => {
        buffer += chunk.toString();
    };

    return {
        stopCapturing: () => { stream.write = oldWrite; },
        getCaptured: () => buffer
    };
}

function subclassError(name) {
    const error = function error(message) {
        Error.call(this);
        Error.captureStackTrace(this);
        this.name = name;
        this.message = message;
    };
    util.inherits(error, Error);
    return error;
}

function saveFile(filename, content) {
    fs.ensureFile(filename, (err) => {
        if (!err) {
            fs.writeFile(filename, content, 'utf8');
        }
    });
}

function hash(value) {
    return crypto.createHash('sha256').update(value).digest('hex');
}
