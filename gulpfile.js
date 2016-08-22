const path = require('path');
const requireDir = require('require-dir');
const gulp = require('gulp-help')(require('gulp')); // eslint-disable-line no-unused-vars

// Add our project folder to the Node module search path
require('app-module-path').addPath(path.resolve(__dirname, './'));

// Register every tasks in the ./gulp folder
requireDir('./gulp', { recurse: true });
