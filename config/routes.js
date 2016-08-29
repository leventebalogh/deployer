import React from 'react';
import { Route, IndexRedirect, IndexRoute } from 'react-router';
import { authLoader, LoginForm, needsAuth } from '../modules/authenticate';
import { configLoader } from '../modules/config';
import { Projects, AddProject, projectsLoader } from '../modules/deployer';
import { VerticalMenuLayout } from '../modules/layouts';

export default (
    <Route path="/" component={VerticalMenuLayout} dataLoaders={[configLoader, authLoader]}>
        <Route path="login" component={LoginForm} />
        <Route path="projects" dataLoaders={[projectsLoader]} onEnter={needsAuth}>
            <IndexRoute component={Projects} />
            <Route path="add" component={AddProject} />
        </Route>
    </Route>
);
