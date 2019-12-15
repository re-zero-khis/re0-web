'use strict';

var React = require('react');
var classNames = require('classnames');

var Button = React.createClass({
    displayName: 'Button',

    propTypes: {
        active: React.PropTypes.bool,
        className: React.PropTypes.string,
        children: React.PropTypes.node,
        onClick: React.PropTypes.func
    },

    render: function render() {
        var _props = this.props,
            children = _props.children,
            active = _props.active,
            onClick = _props.onClick;

        var className = classNames('GitBook-Button', this.props.className, {
            active: active
        });

        return React.createElement(
            'button',
            { className: className, onClick: onClick },
            children
        );
    }
});

module.exports = Button;