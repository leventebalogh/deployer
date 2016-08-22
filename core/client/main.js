import React from 'react';
import _ from 'lodash';
import { Router, browserHistory, createRoutes } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Promise from 'bluebird';
import rawRoutes from '../../config/routes';
import app from './reducers';

/* eslint-disable no-underscore-dangle */
let store = createStore(app, window.__INITIAL_STATE__);
/* eslint-enable no-underscore-dangle */

function mixStoreToRoutes(routes) {
    if (routes) {
        return routes.map(route => {
            // Call on child routes recursively
            route.childRoutes = mixStoreToRoutes(route.childRoutes);

            // Load Data
            // `dataLoaders` property was defined
            // (if things are not present on the state by server side rendering,
            //  then load them automatically)
            if (route.dataLoaders) {
                // Also an `onEnter` hook was defined
                if (route.onEnter) {
                    const originalCallback = route.onEnter;

                    route.onEnter = function onEnter(nextState, replace, callback) {
                        // Fetch data, and only call the original onEnter callback
                        // when the data fetching is done
                        const asyncLoaders = getAsyncLoaders(store.getState, route.dataLoaders);
                        const promises = _.map(
                            asyncLoaders,
                            asyncLoader => asyncLoader(store.dispatch, store.getState)
                        );

                        Promise.all(promises)
                        .then(() => {
                            originalCallback(
                                nextState,
                                replace,
                                callback,
                                store.dispatch,
                                store.getState
                            );
                        });
                    };

                // No `onEnter` was defined
                } else {
                    // Only add .onEnter properties when the data is not available on
                    // the state already (which means we are not in server side rendering)
                    // Other way it causes an error, because the server was markup was rendered
                    // without an onEnter property, but the client side not.
                    route.onEnter = function onEnter(nextState, replace, callback) {
                        const asyncLoaders = getAsyncLoaders(store.getState, route.dataLoaders);
                        const promises = _.map(
                            asyncLoaders,
                            asyncLoader => asyncLoader(store.dispatch, store.getState)
                        );

                        if (promises.length) {
                            Promise.all(promises).then(() => { callback(); });
                        } else {
                            callback();
                        }
                    };
                }

            // Only `onEnter` hook
            } else if (route.onEnter) {
                const originalCallback = route.onEnter;

                route.onEnter = function onEnter(nextState, replace, callback) {
                    originalCallback(
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

    return routes;
}

function getAsyncLoaders(getState, dataLoaders) {
    const state = getState();

    return _(dataLoaders)
        .map(dataLoader => {
            if (!dataLoader.asyncLoader) {
                return false;
            }

            if (dataLoader.stateProperty && state[dataLoader.stateProperty].loaded !== false) {
                return false;
            }

            return dataLoader.asyncLoader;
        })
        .filter()
        .value();
}

const routes = mixStoreToRoutes(createRoutes(rawRoutes));

render((
    <Provider store={store}>
        <Router location="history" history={browserHistory}>{routes}</Router>
    </Provider>
), document.getElementById('app'));
