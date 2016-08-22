import React from 'react';
import HorizontalMenu from '../HorizontalMenu/HorizontalMenu';

export default function HorizontalMenuLayout(props) {
    return (
        <div>
            <HorizontalMenu />
            <div className="menu-layout-content">
                {props.children}
            </div>
        </div>
    );
}
