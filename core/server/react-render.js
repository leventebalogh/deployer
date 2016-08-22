'use strict';

const fs = require('fs');
const path = require('path');
const mustache = require('mustache');
const reactDomServer = require('react-dom/server');
const reactRouter = require('react-router');
const React = require('react');
const createStore = require('redux').createStore;
const Provider = require('react-redux').Provider;
const Promise = require('bluebird');
const clientRoutes = require('build/config/routes');
const utils = require('core/server/utils');
const logger = require('core/server/logger');
const _ = require('lodash');
const registry = require('core/server/registry');
const rootReducer = require('build/core/client/reducers');

module.exports = render;

function render(req, res) {
    const config = registry.get('config');

    registry.get('timer').start('rendering');

    if (!utils.isDevMode || config.get('server-rendering')) {
        renderReact(req, res);
    } else {
        renderEmptyIndexHtml(res);
    }
}

function renderReact(req, res) {
    getRoutesAndStore(clientRoutes, req)
    .then(({ routes, store }) => doRouting(routes, store, req, res));
}

function renderEmptyIndexHtml(res) {
    parseIndexHtml({
        renderedContent: ''
    })
    .then((parsedContent) => {
        res.status(200).send(parsedContent);
    });
}

function getRoutesAndStore(routes, req) {
    routes = reactRouter.createRoutes(routes);
    const routeComponents = getCurrentRouteComponents(routes, req.url);
    const dataLoaders = getDataLoaders(routeComponents);
    const promises = getPromisesFromDataLoaders(dataLoaders, req);

    return Promise.all(promises)
        .then(data => {
            const state = _.reduce(data, _.merge);
            const store = createStore(rootReducer, state);
            return store;
        })
        .then(store => {
            routes = extendOnEnterHooksOnRoutes(routes, store);
            return {
                routes,
                store
            };
        });
}

function getCurrentRouteComponents(routes, url) {
    let routeComponents = [];

    _.each(routes, (route) => {
        if (url.match(route.path)) {
            routeComponents.push(route);
            if (route.childRoutes && route.childRoutes.length) {
                routeComponents = routeComponents.concat(getCurrentRouteComponents(route.childRoutes, url));
            }
        }
    });

    return routeComponents;
}

function getDataLoaders(routes) {
    return _(routes)
        .filter(route => route.dataLoaders)
        .map(route => route.dataLoaders)
        .flatten()
        .value();
}

function getPromisesFromDataLoaders(dataLoaders, req) {
    // Requireing here because promise hub is not
    // ready when loading this file
    const promisehub = registry.get('promisehub');

    return _.map(dataLoaders, (dataLoader) => promisehub.call(dataLoader.url, {
        stateProperty: dataLoader.stateProperty,
        req
    }));
}

function extendOnEnterHooksOnRoutes(routes, store) {
    if (!routes) {
        return routes;
    }

    return routes.map(route => {
        route.childRoutes = extendOnEnterHooksOnRoutes(route.childRoutes, store);

        if (route.onEnter) {
            const originalOnEnter = route.onEnter;

            route.onEnter = (nextState, replace, callback) => {
                originalOnEnter(
                    nextState,
                    replace,
                    callback,
                    store.dispatch,
                    store.getState
                );
            };
        }

        return route;
    });
}

function doRouting(routes, store, req, res) {
    const route = { routes, location: req.url };
    reactRouter.match(route, (error, redirectLocation, renderProps) => {
        // Error
        if (error) {
            res.status(500).send(error.message);
        // Redirect
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        // Ok
        } else if (renderProps) {
            renderRoute(renderProps, store, res, req);
        // Not found
        } else {
            res.status(404).send('Not found');
        }
    });
}

function renderRoute(renderProps, store, res, req) {
    const context = React.createElement(reactRouter.RouterContext, renderProps);
    const contextInProvider = React.createElement(Provider, { store }, context);
    const renderedContent = reactDomServer.renderToString(contextInProvider);

    parseIndexHtml({
        renderedContent,
        state: store.getState()
    })
    .then((parsedContent) => {
        res.status(200).send(parsedContent);
        const elapsedTime = registry.get('timer').end('rendering');
        logger.info(`${elapsedTime}ms [GET] ${req.url}`);
    });
}

function parseIndexHtml(params) {
    return new Promise((resolve) => {
        getIndexHtmlContent()
        .then((content) => {
            content = mustache.render(content, {
                renderedContent: params.renderedContent,
                title: 'React Starter',
                initialState: JSON.stringify(params.state)
            });
            resolve(content);
        })
        .catch((err) => {
            logger.error('Could not find index.html', { error: err });
        });
    });
}

function getIndexHtmlContent() {
    return new Promise((resolve, reject) => {
        const filename = path.join(utils.getProjectRootPath(), 'core', 'client', 'index.html');
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}
