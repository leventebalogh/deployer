import React from 'react';
import Promise from 'bluebird';
import request from 'superagent';
import { setAuth } from './actions';

export const authLoader = {
    url: '/rest/auth',
    stateProperty: 'auth',
    asyncLoader: (dispatch) => new Promise((resolve) => {
        request
            .get('/rest/auth')
            .accept('json')
            .end((err, res) => {
                dispatch(setAuth(res.body));
                resolve();
            });
    })
};
