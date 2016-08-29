const registry = require('core/server/registry');
const utils = require('./server/utils');
const passport = require('passport');
const session = require('express-session');
const basicStrategy = require('./server/strategy.basic');
const localStrategy = require('./server/strategy.local');
const Promise = require('bluebird');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');
const config = registry.get('config');
const app = registry.get('app');
const promisehub = registry.get('promisehub');

utils.registerUsersModelIfNeeded();

app.use(session({
    secret: config.get('authentication.secret', 'krx6jTmvV2DxRM9K'),
    store: new RedisStore({ client: redis.createClient(6379, 'localhost') }),
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use('local', localStrategy.getStrategy());
passport.use('basic', basicStrategy.getStrategy());
passport.serializeUser(localStrategy.serializeUser);
passport.deserializeUser(localStrategy.deserializeUser);

// Add authenticate method to the middleware
registry.add('middleware:authenticate', utils.authenticate);

// Load APIs
require('./server/api.register.js');
require('./server/api.login.js');
require('./server/api.logout.js');
require('./server/api.auth.js');

// Register promisehub endpoints
promisehub.register('/rest/auth', options => Promise.resolve(utils.getAuthObject(options.req)));

// Sample protected content
app.get('/protected', utils.authenticate(), (req, res) => {
    res.send('Macskaawdawdjancsi');
});

app.get('/protected2', utils.authenticate('basic'), (req, res) => {
    res.send('LOFASZ');
});
