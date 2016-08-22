const utils = require('../utils.js');

describe('utils.isDevMode()', () => {
    it('should return true when NODE_ENV is not defined', () => {
        process.env.NODE_ENV = undefined;
        expect(utils.isDevMode()).to.equal(true);
    });

    it('should return true when NODE_ENV is development', () => {
        process.env.NODE_ENV = 'development';
        expect(utils.isDevMode()).to.equal(true);
    });

    it('should return true when NODE_ENV is production', () => {
        process.env.NODE_ENV = 'production';
        expect(utils.isDevMode()).to.equal(false);
    });
});
