import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';
import moment from 'moment';

function Projects({ projects, deleteProject }) {
    return (
        <div className="projects">
            {getEmptyMessage(projects)}
            {renderProjects(projects, deleteProject)}
        </div>
    );
}

function renderProjects(projects, deleteProject) {
    if (_.isArray(projects)) {
        let i = 0;
        return projects.map(project => (
            <div className="project" key={i++}>
                <div className="project-name">
                    <span className="project-live ion-record"></span>
                    {project.name}
                </div>
                <div className="project-info">
                    Last modified: {moment(project.updatedAt).fromNow()}
                </div>
                <div className="project-actions">
                    <Link to={`/projects/${project._id}/edit`} className="circular-button" title="Edit">
                        <i className="ion-gear-b"></i>
                    </Link>
                    <button onClick={deleteProject} className="circular-button" title="Delete">
                        <i className="ion-trash-a"></i>
                    </button>
                    {getLink(project)}
                </div>
            </div>
        ));
    }

    return '';
}

function getLink(project) {
    const link = `/projects/${project._id}`;
    return (
        <Link to={link} title="More" className="pure-button">More</Link>
    );
}

function getEmptyMessage(projects) {
    if (!projects.length) {
        return 'No Projects';
    }

    return '';
}

const mapStateToProps = (state) => ({
    projects: state.projects.data
});

export default connect(
    mapStateToProps
)(Projects);
