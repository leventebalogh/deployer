const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('tests', 'Runs both unit and E2E tests.', () => runSequence('tests:unit', 'tests:e2e'));
