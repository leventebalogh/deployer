const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('check', 'Run all tests and lintings.', () => {
    runSequence(
        'clean',
        'build',
        'lint',
        'tests'
    );
});
