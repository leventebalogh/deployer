const utils = require('core/server/utils');
const spawn = require('child_process').spawn;
const argv = require('yargs').argv;
const nodemon = require('gulp-nodemon');
const _ = require('lodash');
const gulp = require('gulp');

gulp.task('run', 'Starts the webserver. (--server-rendering)', runServer);

function runServer() {
    const path = utils.convertProjectRelativePathToAbsolute('core/server/index.js');
    const isProduction = argv.production || false;

    run(isProduction, path);
}

function run(isProduction, path) {
    if (isProduction) {
        return runProduction(path);
    }

    return runDevelopment(path);
}

function runDevelopment(path) {
    const configDir = utils.convertProjectRelativePathToAbsolute('config');
    const coreDir = utils.convertProjectRelativePathToAbsolute('core/server');
    const e2eDir = utils.convertProjectRelativePathToAbsolute('e2e-tests');
    const modulesDir = utils.convertProjectRelativePathToAbsolute('modules');

    nodemon({
        script: path,
        watch: [
            configDir,
            coreDir,
            e2eDir,
            modulesDir
        ],
        args: process.argv,
        env: { NODE_ENV: 'production' }
    });
}

function runProduction(path) {
    spawn(path, getArgsArray(argv), {
        stdio: [process.stdin, process.stdout, process.stderr]
    });
}

function getArgsArray(args) {
    return _(args)
            .map((value, key) => `--${key}=${value}`)
            .filter(filterDefaultArgs)
            .value();
}

function filterDefaultArgs(arg) {
    return arg.indexOf('--_=') < 0 && arg.indexOf('--$0=') < 0;
}
