import React from 'react';
import { connect } from 'react-redux';
import { toggleMenu } from '../actions';
import VerticalMenu from '../VerticalMenu/VerticalMenu';
import { Notifications } from '../../../notifications';

const VerticalMenuLayout = ({ children, menu, toggleMenu }) => {
    const layoutClass = menu.open ? 'vertical-menu-layout active' : 'vertical-menu-layout';

    return (
        <div className={layoutClass}>
            <span className="vertical-menu-opener" onClick={toggleMenu}><span></span></span>
            <VerticalMenu />
            <div className="vertical-menu-layout-content">{children}</div>
            <Notifications />
        </div>
    );
};

const mapStateToProps = state => ({
    menu: state.menu
});

const mapDispatchToProps = dispatch => ({
    toggleMenu: () => dispatch(toggleMenu())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VerticalMenuLayout);
