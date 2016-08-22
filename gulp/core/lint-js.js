const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('lint:js', 'Lints *.js files only (ESLint)', lintJs);

function lintJs() {
    return gulp.src([
            './modules/**/*.js',
            './core/**/*.js',
            './e2e-tests/**/*.js',
            './gulp-tasks/**/*.js',
            './gulpfile.js'
        ])
        .pipe(eslint({
            useEslintrc: true
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}
