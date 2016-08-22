const gulp = require('gulp');
const mocha = require('gulp-mocha');
const chai = require('chai');

global.expect = chai.expect;

gulp.task('tests:unit', 'Run the unit tests.', runTests);

function runTests() {
    const files = [
        './core/server/**/tests/test-*.js'
    ];
    const options = {
        reporter: 'dot'
    };

    return gulp
        .src(files, { read: false })
        .pipe(mocha(options))
        .on('error', console.log.bind(console));
}
