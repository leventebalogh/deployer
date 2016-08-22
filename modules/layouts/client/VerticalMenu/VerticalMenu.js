import React from 'react';
import { connect } from 'react-redux';
import { getMenuItems, renderMenuItems, getBrand } from '../utils';

function VerticalMenu({ config, auth }) {
    const items = getMenuItems(config, auth);
    const brand = getBrand(config);

    return (
        <div className="vertical-menu">
            <div className="pure-menu">
                <a
                    className="pure-menu-heading"
                    title={brand.title}
                    href={brand.link}
                >
                    {brand.name}
                </a>

                <ul className="pure-menu-list">
                    {renderMenuItems(items)}
                </ul>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    config: state.config,
    auth: state.auth
});

export default connect(
    mapStateToProps
)(VerticalMenu);
