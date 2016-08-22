'use strict';

const async = require('async');
const path = require('path');
const gulp = require('gulp');
const spawn = require('child_process').spawn;

gulp.task('tests:e2e', 'Runs E2E tests only.', e2eTests);

function e2eTests() {
    let processPhantomjs;
    let processServer;

    process.env.NODE_ENV = 'production';

    async.parallel([startPhantomjs, startServer], () => {
        const wdioPath = path.join(__dirname, '..', '..', 'node_modules', '.bin', 'wdio');
        const processWdio = spawn(wdioPath, [], {
            stdio: [process.stdin, process.stdout, process.stderr]
        });

        processWdio.on('exit', (exitCode) => {
            processPhantomjs.kill();
            processServer.kill();
            process.exit(exitCode); // eslint-disable-line no-process-exit
        });
    });

    function startPhantomjs(done) {
        const phantomjsPath = path.join(__dirname, '..', '..', 'node_modules', '.bin', 'phantomjs');
        processPhantomjs = spawn(phantomjsPath, ['--webdriver=4444']);
        processPhantomjs.stdout.on('readable', () => done(null));
    }

    function startServer(done) {
        const serverPath = path.join(__dirname, '..', '..', 'core', 'server', 'index.js');
        processServer = spawn('node', [serverPath], {
            stdio: ['pipe', 'pipe', process.stderr]
        });
        processServer.stdout.on('readable', () => done(null));
    }
}
