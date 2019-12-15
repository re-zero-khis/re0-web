'use strict';

var React = require('react');
var classNames = require('classnames');

var Panel = React.createClass({
    displayName: 'Panel',

    propTypes: {
        className: React.PropTypes.string,
        children: React.PropTypes.node
    },

    render: function render() {
        var _props = this.props,
            className = _props.className,
            children = _props.children;

        className = classNames('GitBook-Panel', className);

        return React.createElement(
            'div',
            { className: className },
            children
        );
    }
});

module.exports = Panel;