'use strict';

var React = require('react');
var classNames = require('classnames');

var ButtonGroup = React.createClass({
    displayName: 'ButtonGroup',

    propTypes: {
        className: React.PropTypes.string,
        children: React.PropTypes.node,
        onClick: React.PropTypes.func
    },

    render: function render() {
        var _props = this.props,
            className = _props.className,
            children = _props.children;


        className = classNames('GitBook-ButtonGroup', className);

        return React.createElement(
            'div',
            { className: className },
            children
        );
    }
});

module.exports = ButtonGroup;