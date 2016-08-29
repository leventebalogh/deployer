import React from 'react';
import _ from 'lodash';
import { createElement } from './Element';
import checkboxElement from './CheckboxElement';
import textareaElement from './TextareaElement';
import dateElement from './DateElement';

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.config = props.config;
        this.state = this.getDefaultState();
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.state[name] = value;
    }

    onSubmit(e) {
        if (this.props.onSubmit) {
            this.props.onSubmit(e, this.state);
        }
    }

    getDefaultState() {
        const state = {};

        _.map(this.config.elements, element => {
            state[element.name] = null;
        });

        return state;
    }

    composeElements(elements) {
        return _.map(elements, (element) => {
            element.onChange = this.onChange;

            switch (element.type) {
                case 'text':
                return createElement(element);

                case 'password':
                return createElement(element);

                case 'checkbox':
                return checkboxElement(element);

                case 'date':
                return dateElement(element);

                case 'textarea':
                return textareaElement(element);

                default:
                return createElement(element);
            }
        });
    }

    render() {
        const config = this.config;

        return (
            <form method={config.method}
                action={config.action}
                id={config.id}
                className="form"
                onSubmit={this.onSubmit}
            >
                {this.composeElements(config.elements)}
            </form>
        );
    }
}
