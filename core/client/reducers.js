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

const projects = (state = { data: [] }, action) => {
    switch (action.type) {
        case 'PROJECTS_SET':
            return {
                data: action.data,
                loaded: true
            };
        case 'PROJECTS_ADD':
            return {
                data: [].concat(state.data).concat([action.data]),
                loaded: true
            };
        case 'PROJECTS_REMOVE':
            return state;
        default:
            return state;
    }
};

const notifications = (state = { data: [] }, action) => {
    switch (action.type) {
        case 'NOTIFICATIONS_SET':
            return {
                data: action.data,
                loaded: true
            };
        case 'NOTIFICATIONS_ADD':
            return {
                data: [].concat(state.data).concat([action.data]),
                loaded: true
            };
        case 'NOTIFICATIONS_DISMISS':
            // get by ID and remove
            return state;
        case 'NOTIFICATIONS_DISMISS_ALL':
            return {
                data: [],
                loaded: true
            };
        default:
            return state;
    }
};


const app = combineReducers({
    todos,
    config,
    loading,
    auth,
    menu,
    projects,
    notifications
});

export default app;
