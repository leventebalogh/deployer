import React from 'react';
import { NotificationStack } from 'react-notification';
import { dismissNotification } from './actions';
import { connect } from 'react-redux';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notifications);

function Notifications({ notifications, onDismiss }) {
    return (
        <div className="notifications">
            <NotificationStack
                notifications={notifications}
                onDismiss={onDismiss}
                barStyleFactory={barStyleFactory}
                activeBarStyleFactory={barStyleFactory}
            />
        </div>
    );
}

// Have to redefine it, as the notification was too high from the bottom
function barStyleFactory(index, style) {
    return {
        left: '1rem',
        bottom: `${1 + index * 4}rem`
    };
}

function mapStateToProps(state) {
    return {
        notifications: state.notifications.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onDismiss: (notification) => dispatch(dismissNotification(notification))
    };
}
