'use strict';

const Config = require('../config');
const errors = require('../errors');
const configMock = {
    modules: [
        'module1',
        'module2'
    ],
    port: 8080,
    environment: 'development',
    common1: 'foo',
    server: {
        server1: 'foo',
        server2: 'bar',
        common1: 'something else'
    },
    client: {
        client1: 'foo',
        client2: 'bar',
        common1: 'lorem ipsum'
    },
    module1: {
        common1: 'foo',
        common2: 'bar',
        server: {
            server1: 'bar',
            common2: 'also different'
        },
        client: {
            client1: 'bar2',
            common2: 'ipsum lorem'
        }
    }
};
let config;

beforeEach(() => {
    config = new Config(configMock);
});

describe('Config()', () => {
    it('should be able to parse an object as initial value', () => {
        expect(config.getAsObject()).to.deep.equal(configMock);
    });

    it('should be able to parse a JSON string as initial value', () => {
        config = new Config(JSON.stringify(configMock));
        expect(config.getAsObject()).to.deep.equal(configMock);
    });

    it('should throw ConfigParseError if config string is in bad format', () => {
        expect(() => new Config('bad format')).to.throw(errors.ConfigParseError);
    });

    it('should throw ConfigFormatError if the initial value is not string or object', () => {
        expect(() => new Config(() => {})).to.throw(errors.ConfigFormatError);
        expect(() => new Config(1)).to.throw(errors.ConfigFormatError);
    });

    it('should persist server side config in a class variable', () => {
        expect(config.client).to.deep.equal(config.getClientConfig());
    });

    it('should persist client side config in a class variable', () => {
        expect(config.server).to.deep.equal(config.getServerConfig());
    });
});

describe('Config.getServerConfig()', () => {
    it('should return a config object that only has server config values', () => {
        const serverConfig = config.getServerConfig();

        expect(serverConfig.port).to.equal(8080);
        expect(serverConfig.server1).to.equal('foo');
        expect(serverConfig.client1).to.be.undefined;
    });

    it('should hold the module configs but only the server side values', () => {
        const serverConfig = config.getServerConfig();

        expect(serverConfig.module1).not.to.be.undefined;
        expect(serverConfig.module1.common1).to.equal('foo');
        expect(serverConfig.module1.server1).to.equal('bar');
    });

    it('should overwrite common values with server-side values', () => {
        const serverConfig = config.getServerConfig();

        expect(serverConfig.common1).to.equal('something else');
        expect(serverConfig.module1.common2).to.equal('also different');
    });
});

describe('Config.getClientConfig()', () => {
    it('should return a config object that only has client-side config values', () => {
        const clientConfig = config.getClientConfig();

        expect(clientConfig.port).to.equal(8080);
        expect(clientConfig.client1).to.equal('foo');
        expect(clientConfig.server1).to.be.undefined;
    });

    it('should hold the module configs but only the client-side values', () => {
        const clientConfig = config.getClientConfig();

        expect(clientConfig.module1).not.to.be.undefined;
        expect(clientConfig.module1.common1).to.equal('foo');
        expect(clientConfig.module1.client1).to.equal('bar2');
    });

    it('should overwrite common values with client-side values', () => {
        const clientConfig = config.getClientConfig();

        expect(clientConfig.common1).to.equal('lorem ipsum');
        expect(clientConfig.module1.common2).to.equal('ipsum lorem');
    });
});

describe('Config.get()', () => {
    it('should return config value by key', () => {
        expect(config.get('modules')).to.deep.equal(['module1', 'module2']);
        expect(config.get('port')).to.deep.equal(8080);
    });

    it('should return the default value when key does not exist', () => {
        expect(config.get('unknownKey', 'default-value')).to.deep.equal('default-value');
    });

    it('should only be able to get server-side options', () => {
        expect(config.get('server1')).to.equal('foo');
        expect(config.get('client1')).to.be.undefined;
    });

    it('should be able to find common and server-side options on the same level ', () => {
        expect(config.get('common1')).to.equal('something else');
        expect(config.get('server1')).to.equal('foo');
    });
});

describe('Config.getAsObject()', () => {
    it('should return the whole config as an object', () => {
        expect(config.getAsObject()).to.deep.equal(configMock);
    });
});
