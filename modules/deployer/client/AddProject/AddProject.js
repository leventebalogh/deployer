import React from 'react';
import { connect } from 'react-redux';
import { Form } from '../../../form-builder';

function AddProject({ config, auth }) {
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
                classes: 'add-project-title-input'
            },
            {
                name: 'repo-location',
                label: 'Repo location',
                type: 'text',
                required: true,
                classes: 'add-project-title-input'
            },
            {
                name: 'server-location',
                label: 'Server location',
                type: 'text',
                required: true,
                classes: 'add-project-title-input'
            },
            {
                name: 'server-working-directory',
                label: 'Server working directory',
                type: 'text',
                required: true,
                classes: 'add-project-title-input'
            },
            {
                name: 'commands',
                label: 'Commands to run on each deploy',
                type: 'text',
                required: false,
                classes: 'add-project-title-input'
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

function onSubmit() {

}

const mapStateToProps = (state) => ({
    config: state.config,
    auth: state.auth
});

export default connect(
    mapStateToProps
)(AddProject);
