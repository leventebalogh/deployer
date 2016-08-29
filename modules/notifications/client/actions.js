import _ from 'lodash';

export function showMessage(message) {
    return showNotification({
        message,
        className: 'notification-general',
        action: 'Ok'
    });
}

export function showSuccess(message) {
    return showNotification({
        message,
        className: 'notification-success',
        action: 'Ok'
    });
}

export function showError(message) {
    return showNotification({
        message,
        className: 'notification-error',
        action: 'Ok'
    });
}

export function showNotification(notification) {
    notification = _.assign({}, {
        key: _.uniqueId(),
        dismissAfter: 6000,
        style: false
    }, notification);

    return {
        type: 'NOTIFICATIONS_ADD',
        data: _.pick(notification, [
            'key',
            'message',
            'title',
            'action',
            'className',
            'activeClassName',
            'dismissAfter',
            'style'
        ])
    };
}

export function setNotifications(data) {
    return {
        type: 'NOTIFICATIONS_SET',
        data
    };
}

export function dismissNotification(data) {
    return {
        type: 'NOTIFICATIONS_DISMISS',
        data
    };
}

export function dismissAllNotifications() {
    return {
        type: 'NOTIFICATIONS_DISMISS_ALL'
    };
}

