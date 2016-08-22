import React from 'react';
import { connect } from 'react-redux';

function Projects({ config, auth }) {
    return (
        <div className="deployer-projects">
            Hello World1
        </div>
    );
}

const mapStateToProps = (state) => ({
    config: state.config,
    auth: state.auth
});

export default connect(
    mapStateToProps
)(Projects);
