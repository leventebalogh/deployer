'use strict';

exports.config = {
    specs: [
        './e2e-tests/**/*.feature'
    ],
    exclude: [],
    capabilities: [{
        browserName: 'phantomjs'
    }],
    logLevel: 'silent',
    coloredLogs: true,
    baseUrl: 'http://localhost:8080',
    waitforTimeout: 10000,
    framework: 'cucumber',
    reporter: 'dot',
    cucumberOpts: {
        require: [
            './e2e-tests/step_definitions'
        ],
        ignoreUndefinedDefinitions: true
    }
};
