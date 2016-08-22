import React from 'react';
import { normalizeElementProperties } from './Element';

export default function dateElement(element) {
    element = normalizeElementProperties(element);

    return (
        <div className="form-element" key={element.name}>
            <label htmlFor={element.name}>{element.label}</label>
            <input
                type="date"
                value={element.value}
                name={element.name}
                id={element.name}
                required={element.required}
                disabled={element.disabled}
            />
        </div>
    );
}
