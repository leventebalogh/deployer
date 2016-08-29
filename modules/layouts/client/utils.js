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
            {renderPrepend(item)}
            {renderMenuItem(item)}
            {renderAppend(item)}
        </li>
    ));
}

export function renderMenuItem(item) {
    if (item.html) {
        return renderHtml(item);
    }

    if (item.pureLink) {
        return (
            <a
                href={item.link}
                title={item.title}
                className="pure-menu-link"
            >
                {getIcon(item.icon)}
                {item.name}
            </a>
        );
    }

    return (
        <Link
            to={item.link}
            title={item.title}
            className="pure-menu-link"
            activeClassName="active"
        >
            {getIcon(item.icon)}
            {item.name}
        </Link>
    );
}

export function getIcon(icon) {
    if (icon) {
        return (
            <span className={`${icon} pure-menu-item-icon`}></span>
        );
    }

    return '';
}

function renderHtml(item) {
    if (item.html) {
        return (
            <div dangerouslySetInnerHTML={{ __html: item.html }} />
        );
    }

    return '';
}

function renderPrepend(item) {
    if (item.prepend) {
        return item.prepend;
    }

    return '';
}

function renderAppend(item) {
    if (item.append) {
        return item.append;
    }

    return '';
}
