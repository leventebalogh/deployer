const gulp = require('gulp');

gulp.task('tests:tdd:unit', 'Run unit tests on file changes.', unit);
gulp.task('tests:tdd:e2e', 'Run E2E tests on file changes.', e2e);
gulp.task('tests:tdd', 'Run all tests on file changes.', all);

function unit() {
    return gulp.watch(
        ['./core/**/*.js'],
        ['tests:unit']
    );
}

function e2e() {
    return gulp.watch(
        [
            './e2e-tests/**/*.js',
            './e2e-tests/**/*.feature'
        ],
        ['tests:e2e']
    );
}

function all() {
    return gulp.watch(
        [
            './core/**/*.js',
            './e2e-tests/**/*.js',
            './e2e-tests/**/*.feature'
        ],
        ['tests']
    );
}
