'use strict';

var React = require('react');
var classNames = require('classnames');

var POSITIONS = {
    BOTTOM_RIGHT: 'e',
    BOTTOM_LEFT: 'w',
    TOP_LEFT: 'nw',
    TOP_RIGHT: 'ne',
    BOTTOM: '',
    TOP: 'n'
};

var Tooltipped = React.createClass({
    displayName: 'Tooltipped',

    propTypes: {
        title: React.PropTypes.string.isRequired,
        position: React.PropTypes.string,
        open: React.PropTypes.bool,
        children: React.PropTypes.node
    },

    statics: {
        POSITIONS: POSITIONS
    },

    render: function render() {
        var _props = this.props,
            title = _props.title,
            position = _props.position,
            open = _props.open,
            children = _props.children;


        var className = classNames('GitBook-Tooltipped', position ? 'Tooltipped-' + position : '', {
            'Tooltipped-o': open
        });

        return React.createElement(
            'div',
            { className: className, 'aria-label': title },
            children
        );
    }
});

module.exports = Tooltipped;