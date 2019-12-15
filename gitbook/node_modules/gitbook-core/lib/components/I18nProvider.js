'use strict';

var _require = require('immutable'),
    Map = _require.Map;

var React = require('react');
var intl = require('react-intl');
var ReactRedux = require('react-redux');

var I18nProvider = React.createClass({
    displayName: 'I18nProvider',

    propTypes: {
        children: React.PropTypes.node,
        messages: React.PropTypes.object
    },

    render: function render() {
        var messages = this.props.messages;

        messages = messages.get('en', Map()).toJS();

        return React.createElement(
            intl.IntlProvider,
            { locale: 'en', messages: messages },
            this.props.children
        );
    }
});

var mapStateToProps = function mapStateToProps(state) {
    return { messages: state.i18n.messages };
};

module.exports = ReactRedux.connect(mapStateToProps)(I18nProvider);