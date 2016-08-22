import React from 'react';
import { connect } from 'react-redux';
import { getBrand, getMenuItems, renderMenuItems } from '../utils';

function HorizontalMenu({ config, auth }) {
    const items = getMenuItems(config, auth);
    const brand = getBrand(config);

    return (
        <div className="horizontal-menu pure-menu pure-menu-horizontal">
            <a href={brand.link} title={brand.title} className="pure-menu-heading pure-menu-link">
                {brand.name}
            </a>
            <ul className="pure-menu-list">
                {renderMenuItems(items)}
            </ul>
        </div>
    );
}

const mapStateToProps = (state) => ({
    config: state.config,
    auth: state.auth
});

export default connect(
    mapStateToProps
)(HorizontalMenu);
