import React from 'react';
import { normalizeElementProperties } from './Element';

export default function textareaElement(element) {
    element = normalizeElementProperties(element);

    let description = '';

    if (element.description) {
        description = <span className="form-element-description">{element.description}</span>;
    }

    return (
        <div className="form-element" key={element.name}>
            <label htmlFor={element.name}>
                {element.label}
                {description}
            </label>
            <textarea
                className={element.classes}
                placeholder={element.placeholder}
                name={element.name}
                id={element.name}
                required={element.required}
                disabled={element.disabled}
                defaultValue={element.value}
                onChange={element.onChange}
            ></textarea>
        </div>
    );
}
