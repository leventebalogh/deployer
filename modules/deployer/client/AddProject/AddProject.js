import React from 'react';
import request from 'superagent';
import { connect } from 'react-redux';
import { Form } from '../../../form-builder';
import { showSuccess, showError } from '../../../notifications';
import { addProject } from '../actions';

function AddProject({ config, auth, onSubmit }) {
    return (
        <div className="add-project">
            <h2 className="add-project-title">Add a new project</h2>
            <Form config={getFormConfig()} onSubmit={onSubmit} />
        </div>
    );
}

function getFormConfig() {
    return {
        elements: [
            {
                name: 'name',
                label: 'Name',
                type: 'text',
                required: true,
                classes: 'add-project-input'
            },
            {
                name: 'repo-location',
                label: 'Repo location',
                type: 'text',
                required: true,
                classes: 'add-project-input',
                description: 'A link pointing to a git repository, either on GitHub on your own server.'
            },
            {
                name: 'server-location',
                label: 'Server location',
                type: 'text',
                required: true,
                classes: 'add-project-input'
            },
            {
                name: 'server-working-directory',
                label: 'Server working directory',
                type: 'text',
                required: true,
                classes: 'add-project-input'
            },
            {
                name: 'commands',
                label: 'Commands to run on each deploy',
                type: 'textarea',
                required: false,
                classes: 'add-project-input add-project-commands',
                placeholder: 'E.g. npm install',
                description: 'List bash commands you would like to run on each deploy. Separate every command with a new line.'
            },
            {
                name: 'save',
                label: '',
                value: 'Save',
                type: 'submit',
                classes: 'pure-button pure-button-primary add-project-save'
            }
        ]
    };
}

const mapStateToProps = (state) => ({
    config: state.config,
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (e, formData) => {
        e.preventDefault();
        request
            .post('/rest/projects')
            .send(formData)
            .accept('json')
            .end((err, res) => {
                if (err && res.body.error) {
                    dispatch(showError(res.body.error));
                } else {
                    dispatch(addProject(res.body));
                    dispatch(showSuccess('Successfully added project.'));
                }
            });
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddProject);
