import React from 'react';
import { Route } from 'react-router';
import { authLoader, RegistrationForm, LoginForm } from '../modules/authenticate';
import { configLoader } from '../modules/config';
import { HorizontalMenuLayout, VerticalMenuLayout } from '../modules/layouts';

export default (
    <Route path="/" component={VerticalMenuLayout} dataLoaders={[configLoader, authLoader]}>
        <Route path="login" component={LoginForm} />
        <Route path="register" component={RegistrationForm} />
    </Route>
);
