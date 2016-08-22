import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';

export function getBrand(config) {
    return _.get(config, 'menu.brand');
}

export function getMenuItems(config, auth) {
    let configKey = 'menu.items';

    if (auth.loggedIn) {
        configKey = 'menu.itemsLoggedIn';
    }

    return _.get(config, configKey);
}

export function renderMenuItems(items) {
    let i = 0;

    return _.map(items, item => (
        <li className="pure-menu-item" key={i++}>
            <Link
                to={item.link}
                title={item.title}
                className="pure-menu-link"
                activeClassName="active"
            >
                {item.name}
            </Link>
        </li>
    ));
}
