import request from 'superagent';
import { setAuth } from './actions';

export const needsAuth = (nextState, replace, callback, dispatch, getState) => {
    const state = getState();
    const auth = state.auth;

    if (!auth.loaded) {
        request
            .get('/rest/auth')
            .accept('json')
            .end((err, res) => {
                const newAuth = res.body;

                dispatch(setAuth(newAuth));
                redirectIfNotLoggedIn(newAuth.loggedIn);
            });
    } else {
        redirectIfNotLoggedIn(auth.loggedIn);
    }

    function redirectIfNotLoggedIn(loggedIn) {
        if (!loggedIn) {
            replace({
                pathname: '/login',
                state: { nextPathname: nextState.location.pathname }
            });
        }

        callback();
    }
};
