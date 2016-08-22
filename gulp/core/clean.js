const del = require('del');
const gulp = require('gulp');
const gulpConfig = require('gulp/config');

gulp.task('clean', 'Cleans all generated directories and files.', ['clean:tmp'], clean);

function clean() {
    return del.sync([
        gulpConfig.buildDirectory,
        gulpConfig.assetsExposedDirectory
    ]);
}
