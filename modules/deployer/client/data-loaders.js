import Promise from 'bluebird';
import request from 'superagent';
import { setProjects } from './actions';

export const projectsLoader = {
    url: '/rest/projects',
    stateProperty: 'projects',
    asyncLoader: (dispatch) => new Promise((resolve) => {
        request
            .get('/rest/projects')
            .accept('json')
            .end((err, res) => {
                dispatch(setProjects(res.body));
                resolve();
            });
    })
};
