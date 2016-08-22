import React from 'react';
import _ from 'lodash';

export function createElement(element) {
    element = normalizeElementProperties(element);
    let required = '';

    if (element.required) {
        required = <em title="This field is required">*</em>;
    }

    return (
        <div className="form-element" key={element.name}>
            <label htmlFor={element.name}>
                {element.label}
                {required}
            </label>
            <input
                className={element.classes}
                type={element.type}
                defaultValue={element.value}
                placeholder={element.placeholder}
                name={element.name}
                id={element.name}
                required={element.required}
                disabled={element.disabled}
                onChange={element.onChange}
            />
        </div>
    );
}

export function normalizeElementProperties(element) {
    const availableTypes = [
        'text',
        'password',
        'radio',
        'checkbox',
        'number',
        'button',
        'submit',
        'date',
        'range',
        'month',
        'week',
        'time',
        'datetime',
        'email',
        'search',
        'tel',
        'url'
    ];

    if (availableTypes.indexOf(element.type) === -1) {
        element.type = 'text';
    }

    if (!element.onChange) {
        element.onChange = () => {};
    }

    if (!element.classes) {
        element.classes = '';
    }

    if (element.type === 'checkbox') {
        return _.assign({
            value: '',
            name: '',
            id: '',
            required: false,
            checked: false,
            disabled: false
        }, element);
    }

    return _.assign({
        type: 'text',
        value: '',
        placeholder: '',
        name: '',
        id: '',
        required: false,
        disabled: false
    }, element);
}
