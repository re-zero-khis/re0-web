'use strict';

var React = require('react');
var HotKeys = require('./HotKeys');

/**
 * Backdrop for modals, dropdown, etc. that covers the whole screen
 * and handles click and pressing escape.
 *
 * <Backdrop onClose={onCloseModal} />
 */
var Backdrop = React.createClass({
    displayName: 'Backdrop',

    propTypes: {
        // Callback when backdrop is closed
        onClose: React.PropTypes.func.isRequired,
        // Z-index for the backdrop
        zIndex: React.PropTypes.number,
        children: React.PropTypes.node
    },

    getDefaultProps: function getDefaultProps() {
        return {
            zIndex: 200
        };
    },
    onClick: function onClick(event) {
        var onClose = this.props.onClose;


        event.preventDefault();
        event.stopPropagation();

        onClose();
    },
    render: function render() {
        var _props = this.props,
            zIndex = _props.zIndex,
            children = _props.children,
            onClose = _props.onClose;

        var style = {
            zIndex: zIndex,
            position: 'fixed',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%'
        };
        var keyMap = {
            'escape': onClose
        };

        return React.createElement(
            HotKeys,
            { keyMap: keyMap },
            React.createElement(
                'div',
                { style: style, onClick: this.onClick },
                children
            )
        );
    }
});

module.exports = Backdrop;