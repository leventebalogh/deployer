const gulp = require('gulp');
const _ = require('lodash');
const eventStream = require('event-stream');
const gulpConfig = require('gulp/config');
const Config = require('core/server/config');
const configFile = require('config/config');
const config = new Config(configFile);

gulp.task('expose-public-directories',
    'Copies `public` directories under modules to `assets/exposed` directory.',
    () => eventStream.merge(getStreams())
);

function getStreams() {
    return _.map(config.get('modules'), moduleName => getCopyStream(moduleName));
}

function getCopyStream(moduleName) {
    return gulp.src(`modules/${moduleName}/client/public/**`)
        .pipe(gulp.dest(`${gulpConfig.assetsExposedDirectory}/${moduleName}`));
}
