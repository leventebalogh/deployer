const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('lint', 'Lints the whole project.', () => runSequence('lint:js', 'lint:css'));
