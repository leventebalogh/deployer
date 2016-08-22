'use strict';

const utils = require('../utils');
const logger = require('../logger');
let stdout;
let stderr;

beforeEach(() => {
    stdout = utils.captureStdOut();
    stderr = utils.captureStdErr();
});

afterEach(() => {
    stdout.stopCapturing();
    stderr.stopCapturing();
});

describe('logger.info()', () => {
    it('should log to STDOUT when loglevel is at least info', () => {
        logger.setLevel('info');
        logger.info('This is an INFO');
        expect(stdout.getCaptured()).to.contain('This is an INFO');
    });

    it('should not log to STDOUT when loglevel is greater than info', () => {
        logger.setLevel('warning');
        logger.info('This is an INFO');
        expect(stdout.getCaptured()).not.to.contain('This is an INFO');
    });
});

describe('logger.warning()', () => {
    it('should log to STDOUT when loglevel is at least warning', () => {
        logger.setLevel('warn');
        logger.warning('This is a WARNING');
        expect(stdout.getCaptured()).to.contain('This is a WARNING');
    });

    it('should not log to STDOUT when loglevel is greater than warning', () => {
        logger.setLevel('error');
        logger.warning('This is a WARNING');
        expect(stdout.getCaptured()).not.to.contain('This is an WARNING');
    });
});

describe('logger.error()', () => {
    it('should log to STDOUT when loglevel is at least error', () => {
        logger.setLevel('error');
        logger.error('This is an ERROR');
        expect(stderr.getCaptured()).to.contain('This is an ERROR');
    });
});

