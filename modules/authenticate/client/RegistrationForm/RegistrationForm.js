import React from 'react';
import _ from 'lodash';
import { browserHistory, Link } from 'react-router';
import request from 'superagent';
import { connect } from 'react-redux';
import { setAuth } from '../actions';
import { Form } from '../../../form-builder';

const RegistrationForm = ({ config, auth, onSubmit }) => {
    const formConfig = getFormConfig(config);
    const errorMessage = getErrorMessage(auth);
    const linkToLogin = getLinkToLogin(config);

    return (
        <div className="registration-form">
            {errorMessage}
            <Form config={formConfig} onSubmit={_.curry(onSubmit)(config)} />
            {linkToLogin}
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
            .post(getRegistrationApiUrl(config))
            .send(formData)
            .accept('json')
            .end((err, res) => {
                if (err) {
                    // @todo leventebalogh 2016-08-10 Handle errors
                } else if (res.body.error) {
                    dispatch(setAuth({
                        loaded: true,
                        loggedIn: false,
                        registrationError: res.body.error
                    }));
                } else {
                    dispatch(setAuth({
                        loaded: true,
                        loggedIn: res.body.loggedIn
                    }));
                    redirect(getSuccessRedirect(config));
                }
            });
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegistrationForm);

function redirect(target) {
    browserHistory.push(target);
}

function getLoginUrl(config) {
    return _.get(config, 'authentication.login.url');
}

function getRegistrationApiUrl(config) {
    return _.get(config, 'authentication.registration.apiUrl');
}

function getSuccessRedirect(config) {
    return _.get(config, 'authentication.registration.successRedirect', '/');
}

function getFormConfig(config) {
    return _.get(config, 'authentication.registrationForm', defaultConfig());
}

function isLoginEnabled(config) {
    return _.get(config, 'authentication.login.enabled');
}

function getErrorMessage(auth) {
    if (auth.registrationError) {
        return (<div className="registration-form-error">{auth.registrationError}</div>);
    }

    return '';
}

function getLinkToLogin(config) {
    if (isLoginEnabled(config)) {
        return (<Link to={getLoginUrl(config)}>Sign in</Link>);
    }

    return '';
}

function defaultConfig(config) {
    return {
        action: getRegistrationApiUrl(config),
        method: 'post',
        elements: [
            {
                name: 'username',
                label: 'Username',
                type: 'text',
                required: true
            },
            {
                name: 'email',
                label: 'E-mail',
                type: 'email',
                required: true
            },
            {
                name: 'password',
                label: 'Password',
                type: 'password',
                required: true
            },
            {
                name: 'passwordConfirmation',
                label: 'Password again',
                type: 'password',
                required: true
            },
            {
                name: 'register',
                label: '',
                type: 'submit',
                value: 'Register',
                classes: 'pure-button pure-button-primary'
            }
        ]
    };
}