const gulp = require('gulp');

gulp.task('build',
    'Runs all every build task.',
    ['build:js', 'build:css', 'expose-public-directories']
);
