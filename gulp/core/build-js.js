'use strict';

const browserify = require('browserify');
const watchify = require('watchify');
const through = require('through2');
const _ = require('lodash');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const source = require('vinyl-source-stream');
const utils = require('core/server/utils');
const gulpConfig = require('gulp/config');

gulp.task('build:js', 'Builds *.js files only.', buildJs.bind(null, { watch: false }));
gulp.task('watch:js', 'Watches changes in *.js files.', buildJs.bind(null, { watch: true }));

function buildJs(opts) {
    opts = _.extend({
        watch: false
    }, opts);

    const b = createBrowserifyInstance(opts);
    b.transform('babelify', {
        presets: ['es2015', 'react'],
        plugins: [
            'transform-decorators-legacy',
            'transform-class-properties',
            'add-module-exports'
        ]
    });
    b.transform(exportCompiledFiles);
    b.on('update', bundleJs.bind(null, b));
    b.on('log', (msg) => $.util.log(msg));

    return bundleJs(b);
}

function createBrowserifyInstance(opts) {
    const plugins = (opts.watch) ? [watchify] : [];

    return browserify({
        entries: [gulpConfig.jsEntry],
        cache: {},
        packageCache: {},
        debug: true,
        plugin: plugins
    });
}

function bundleJs(b) {
    return b
    .bundle()
    .on('error', browserifyErrorHandler)
    .pipe(source('build.js'))
    .pipe($.buffer())
    .pipe($.sourcemaps.init())
    .pipe($.uglify())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(gulpConfig.jsBuildOutput));
}

function browserifyErrorHandler(err) {
    const message = [
        $.util.colors.red('Javascript Error:'),
        _.trim(err.toString()),
        _.trim(err.codeFrame)
    ].join('\n');

    $.util.log(message);
    this.emit('end');
}

function exportCompiledFiles(file) {
    return through(function saveCompiledFile(buf, enc, next) {
        const content = buf.toString('utf8');
        saveCompiledFileForServer(file, content);
        this.push(content);
        next();
    });
}

function saveCompiledFileForServer(file, content) {
    const rootPath = utils.getProjectRootPath();
    file = file.replace(rootPath, `${rootPath}/${gulpConfig.jsCompiledOutput}`);
    utils.saveFile(file, content);
}

function humanFileSize(bytes, si) {
    const thresh = si ? 1000 : 1024;
    const units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;

    if (Math.abs(bytes) < thresh) {
        return `${bytes} B`;
    }

    do {
        bytes /= thresh;
        ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);

    return `${bytes.toFixed(1)} ${units[u]}`;
}
