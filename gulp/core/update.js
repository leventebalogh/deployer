// @todo leventebalogh 2016-08-20 Show changes in the package.json file compared to previous version
const _ = require('lodash');
const gulp = require('gulp');
const git = require('simple-git')();
const Promise = require('bluebird');
const semverCompare = require('semver-compare');
const colors = require('colors/safe');
const confirm = require('confirm-simple');
const runSequence = require('run-sequence');
const argv = require('yargs').argv;
const $ = require('gulp-load-plugins')({ camelize: true });
const utils = require('../../core/server/utils');
const repoPath = 'https://github.com/leventebalogh/react-starter.git';
const updatePaths = [
    'core/**/*',
    'gulp/core/**/*',
    'modules/authenticate/**/*',
    'modules/config/**/*',
    'modules/form-builder/**/*',
    'modules/ionicons/**/*',
    'modules/layouts/**/*',
    'modules/mongodb/**/*',
    'assets/vendor/**/*'
];

gulp.task('update', 'Checks for updates, --force', ['clean:tmp'], (done) => {
    log('Checking for updates...');

    cloneRepo()
    .then(checkIfUpdateAvailable)
    .then(logUpdateInfo)
    .then(confirmUpdate)
    .then(overWritePaths)
    .then(() => log(colors.bold.green('Update successful.')))
    .catch((error) => {
        log(colors.bold.red(error));
        logVersionInfo();
    })
    .finally(() => {
        runSequence('clean:tmp');
        done();
    });
});

function checkIfUpdateAvailable() {
    return new Promise((resolve, reject) => {
        if (argv.force) {
            resolve();
        } else if (semverCompare(getLatestVersion(), getCurrentVersion()) === 1) {
            resolve();
        } else {
            reject('Everything is up to date');
        }
    });
}

function logUpdateInfo() {
    log(colors.green.bold('Update is available'));
    logVersionInfo();
    logEmptyLine();

    log(colors.red.bold('Make sure you commit all of your changes before running this task.'));
    log(colors.red('Run `git reset --hard` to revert all changes made by the update.'));
    logEmptyLine();

    log(colors.red.bold('The following paths will be updated:'));
    log('(Only matching files will be overwritten under the following paths)');
    _.forEach(updatePaths, (path) => log(`- ${path}`));
}

function logVersionInfo() {
    log(`Current version is: ${getCurrentVersion()}`);
    log(`Latest version is: ${getLatestVersion()}`);
}

function confirmUpdate() {
    return new Promise((resolve, reject) => {
        confirm('Continue update?', (confirmed) => {
            if (confirmed) {
                resolve();
            } else {
                reject('Update aborted.');
            }
        });
    });
}

function overWritePaths() {
    const copyPromises = _.map(updatePaths, (path) => {
        const origin = `${__dirname}/../../tmp/${path}`;
        const dest = `${__dirname}/../../${path}`.replace('**/*', '');

        return overWriteSinglePath(origin, dest);
    });

    return Promise.all(copyPromises);
}

function overWriteSinglePath(origin, dest) {
    return new Promise((resolve) => {
        gulp.src(origin)
            .pipe(gulp.dest(dest))
            .on('end', resolve);
    });
}

function getCurrentVersion() {
    return getVersion('package.json');
}

function getLatestVersion() {
    return getVersion('tmp/package.json');
}

function getVersion(filename) {
    filename = utils.convertProjectRelativePathToAbsolute(filename);
    const packageJson = require(filename);

    return packageJson.version || '0.0.0';
}

function cloneRepo() {
    const localPath = `${__dirname}/../../tmp`;

    return new Promise((resolve) => {
        git.clone(repoPath, localPath, resolve);
    });
}

function log(message) {
    return $.util.log(`[UPDATE] ${message}`);
}

function logEmptyLine() {
    return log('');
}
