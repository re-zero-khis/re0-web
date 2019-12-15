'use strict';

var React = require('react');

var _require = require('react-redux'),
    Provider = _require.Provider;

var ContextShape = require('../propTypes/Context');

/**
 * React component to provide a GitBook context to children components.
 */

var ContextProvider = React.createClass({
    displayName: 'ContextProvider',

    propTypes: {
        context: ContextShape.isRequired,
        children: React.PropTypes.node
    },

    childContextTypes: {
        gitbook: ContextShape
    },

    getChildContext: function getChildContext() {
        var context = this.props.context;


        return {
            gitbook: context
        };
    },
    render: function render() {
        var _props = this.props,
            context = _props.context,
            children = _props.children;

        return React.createElement(
            Provider,
            { store: context.store },
            children
        );
    }
});

module.exports = ContextProvider;