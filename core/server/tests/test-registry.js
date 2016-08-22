'use strict';

const errors = require('../errors');
let registry;

/* eslint global-require: 0 */
beforeEach(() => {
    registry = require('../registry');
});

describe('Registry', () => {
    it('should be able to add objects to the registry', () => {
        const obj = { bar: 1 };
        registry.add('foo', obj);
        expect(registry.get('foo')).to.be.equal(obj);
    });

    it('should throw DuplicateRegistrationError when trying to redifine a service', () => {
        expect(() => {
            registry.add('foo', 1);
            registry.add('foo', 2);
        }).to.throw(errors.DuplicateRegistrationError);
    });
});
