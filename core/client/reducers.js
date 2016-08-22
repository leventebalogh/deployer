import { combineReducers } from 'redux';
import _ from 'lodash';

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    title: action.title,
                    content: action.content
                }
            ];
        default:
            return state;
    }
};

const config = (state = { loaded: false }, action) => {
    switch (action.type) {
        case 'SET_CONFIG':
            return _.assign({}, state, action.config);
        default:
            return state;
    }
};

const loading = (state = false, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return true;
        case 'STOP_LOADING':
            return false;
        default:
            return state;
    }
};

const auth = (state = { loaded: false }, action) => {
    switch (action.type) {
        case 'SET_AUTH':
            return _.assign({}, state, action.data);
        default:
            return state;
    }
};

const menu = (state = { open: false }, action) => {
    switch (action.type) {
        case 'TOGGLE_MENU':
            return { open: !state.open };
        case 'OPEN_MENU':
            return { open: true };
        case 'CLOSE_MENU':
            return { open: false };
        default:
            return state;
    }
};

const app = combineReducers({
    todos,
    config,
    loading,
    auth,
    menu
});

export default app;
