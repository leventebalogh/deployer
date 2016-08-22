import React from 'react';
import request from 'superagent';
import _ from 'lodash';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import { setAuth } from '../actions';
import { Form } from '../../../form-builder';

const LoginForm = ({ config, auth, onSubmit }) => {
    const formConfig = getFormConfig(config);
    const errorMessage = getErrorMessage(auth);
    const linkToRegistration = getLinkToRegistration(config);

    return (
        <div className="login-form">
            {errorMessage}
            <Form config={formConfig} onSubmit={_.curry(onSubmit)(config)} />
            {linkToRegistration}
        </div>
    );
};

const mapStateToProps = (state) => ({
    config: state.config,
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (config, e, formData) => {
        e.preventDefault();
        request
            .post(getLoginApiUrl(config))
            .send(formData)
            .accept('json')
            .end((err, res) => {
                if (err) {
                    // @todo leventebalogh 2016-08-10 Handle errors
                } else if (res.body.error) {
                    dispatch(setAuth({
                        loaded: true,
                        loggedIn: false,
                        loginError: res.body.error
                    }));
                } else {
                    dispatch(setAuth(res.body));
                    redirect(getSuccessRedirect(config));
                }
            });
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);

function redirect(target) {
    browserHistory.push(target);
}

function getSuccessRedirect(config) {
    return _.get(config, 'authentication.registration.successRedirect', '/');
}

function getFormConfig(config) {
    return _.get(config, 'authentication.loginForm', defaultConfig(config));
}

function getLoginApiUrl(config) {
    return _.get(config, 'authentication.login.apiUrl');
}

function getRegistrationUrl(config) {
    return _.get(config, 'authentication.registration.url');
}

function isRegistrationEnabled(config) {
    return _.get(config, 'authentication.registration.enabled');
}

function getErrorMessage(auth) {
    if (auth.loginError) {
        return (<div className="login-form-error">{auth.loginError}</div>);
    }

    return '';
}

function getLinkToRegistration(config) {
    if (isRegistrationEnabled(config)) {
        return (<Link to={getRegistrationUrl(config)}>Create a new account</Link>);
    }

    return '';
}

function defaultConfig(config) {
    return {
        action: getLoginApiUrl(config),
        method: 'post',
        elements: [
            {
                name: 'username',
                label: 'Username',
                type: 'text',
                required: true
            },
            {
                name: 'password',
                label: 'Password',
                type: 'password',
                required: true
            },
            {
                name: 'login',
                label: '',
                value: 'Login',
                type: 'submit',
                classes: 'pure-button pure-button-primary'
            }
        ]
    };
}