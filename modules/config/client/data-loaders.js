import React from 'react';
import Promise from 'bluebird';
import request from 'superagent';
import { setConfig } from './actions';

// `url` and `stateProperty` properties will be used by server-side rendering
// `asyncLoader` will be used, if the stateProperties are not present, or not loaded yet
// It will only call the onEnter hook, if that data is loaded.
export const configLoader = {
    url: '/rest/config',
    stateProperty: 'config',
    asyncLoader: (dispatch) => new Promise((resolve) => {
        request
            .get('/rest/config')
            .accept('json')
            .end((err, res) => {
                dispatch(setConfig(res.body));
                resolve();
            });
    })
};
