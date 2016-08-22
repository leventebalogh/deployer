const del = require('del');
const gulp = require('gulp');
const gulpConfig = require('gulp/config');

gulp.task('clean:tmp', 'Removes the tmp directory.', clean);

function clean() {
    return del.sync([
        gulpConfig.tmpDirectory
    ]);
}
