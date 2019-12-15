'use strict';

var React = require('react');

var _require = require('../components/InjectedComponent'),
    InjectedComponent = _require.InjectedComponent;

var PJAXWrapper = require('../components/PJAXWrapper');
var I18nProvider = require('../components/I18nProvider');
var ContextProvider = require('../components/ContextProvider');
var History = require('../actions/history');
var contextShape = require('../propTypes/Context');

var GitBookApplication = React.createClass({
    displayName: 'GitBookApplication',

    propTypes: {
        context: contextShape,
        matching: React.PropTypes.object
    },

    componentDidMount: function componentDidMount() {
        var context = this.props.context;

        context.dispatch(History.activate());
    },
    componentWillUnmount: function componentWillUnmount() {
        var context = this.props.context;

        context.dispatch(History.deactivate());
    },
    render: function render() {
        var _props = this.props,
            context = _props.context,
            matching = _props.matching;


        return React.createElement(
            ContextProvider,
            { context: context },
            React.createElement(
                PJAXWrapper,
                null,
                React.createElement(
                    I18nProvider,
                    null,
                    React.createElement(InjectedComponent, { matching: matching })
                )
            )
        );
    }
});

/**
 * Render the application for a GitBook context.
 *
 * @param  {GitBookContext} context
 * @param  {Object} matching
 * @return {React.Element} element
 */
function renderWithContext(context, matching) {
    return React.createElement(GitBookApplication, { context: context, matching: matching });
}

module.exports = renderWithContext;