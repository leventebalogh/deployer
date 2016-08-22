const gulp = require('gulp');
const sassLint = require('gulp-sass-lint');

gulp.task('lint:css', 'Lints *.scss files only (SassLint)', lintCss);

function lintCss() {
    return gulp.src([
            './modules/**/*.s+(a|c)ss',
            './core/**/*.s+(a|c)ss',
            './config/*.s+(a|c)ss'
        ])
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
}
