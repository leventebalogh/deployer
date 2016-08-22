const gulp = require('gulp');
const glob = require('glob');
const $ = require('gulp-load-plugins')({ camelize: true });
const _ = require('lodash');
const gulpConfig = require('gulp/config');
const utils = require('core/server/utils');
const Config = require('core/server/config');
const configFile = require('config/config');
const config = new Config(configFile);

gulp.task('build:css', 'Builds *.scss files only.', buildCss);
gulp.task('watch:css', 'Watches changes in *.scss files.', () => gulp.watch(
    ['core/**/*.scss', 'modules/**/*.scss', 'config/**/*.scss'],
    ['build:css']
));

function buildCss() {
    return gulp.src(gulpConfig.cssEntry)
               .pipe($.change(changeSrc))
               .pipe($.sass().on('error', $.sass.logError))
               .pipe($.addSrc('./assets/vendor/pure-0.6.min.css'))
               .pipe($.cleanCss())
               .pipe($.concat('build.css'))
               .pipe(gulp.dest(gulpConfig.cssBuildOutput));
}

function changeSrc(content) {
    const files = _.concat(
        getVariablesFile(),
        getModuleSassFiles()
    );

    return `${formatImports(files)} \n ${content}`;
}

function getVariablesFile() {
    return utils.convertProjectRelativePathToAbsolute('config/variables.scss');
}

function getModuleSassFiles() {
    return _(config.get('modules'))
        .map(moduleName => glob.sync(
            `${utils.getModulesDirectory()}/${moduleName}/**/*.scss`,
            {
                ignore: `${utils.getModulesDirectory()}/${moduleName}/**/_*`
            }
        ))
        .flatten()
        .value();
}

function formatImports(files) {
    return _.reduce(files, (output, file) => `${output} @import '${file}'; \n`, '');
}
