import React from 'react';
import { normalizeElementProperties } from './Element';

export default function checkboxElement(element) {
    element = normalizeElementProperties(element);

    return (
        <div className="form-element" key={element.name}>
            <input
                type="checkbox"
                className={element.classes}
                defaultValue={element.value}
                name={element.name}
                id={element.name}
                required={element.required}
                disabled={element.disabled}
            />
            <label htmlFor={element.name}>{element.label}</label>
        </div>
    );
}
