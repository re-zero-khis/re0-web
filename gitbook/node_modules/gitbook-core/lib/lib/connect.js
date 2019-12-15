'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var ReactRedux = require('react-redux');

var _require = require('react-intl'),
    injectIntl = _require.injectIntl;

var ContextShape = require('../propTypes/Context');

/**
 * Use the GitBook context provided by ContextProvider to map actions to props
 * @param  {ReactComponent} Component
 * @param  {Function} mapActionsToProps
 * @return {ReactComponent}
 */
function connectToActions(Component, mapActionsToProps) {
    if (!mapActionsToProps) {
        return Component;
    }

    return React.createClass({
        displayName: 'ConnectActions(' + Component.displayName + ')',
        propTypes: {
            children: React.PropTypes.node
        },

        contextTypes: {
            gitbook: ContextShape.isRequired
        },

        render: function render() {
            var gitbook = this.context.gitbook;

            var _props = this.props,
                children = _props.children,
                props = _objectWithoutProperties(_props, ['children']);

            var actions = gitbook.actions,
                store = gitbook.store;


            var actionsProps = mapActionsToProps(actions, store.dispatch);

            return React.createElement(
                Component,
                _extends({}, props, actionsProps),
                children
            );
        }
    });
}

/**
 * Connect to i18n
 * @param {ReactComponent} Component
 * @return {ReactComponent}
 */
function connectToI18n(Component) {
    return injectIntl(function (_ref) {
        var intl = _ref.intl,
            children = _ref.children,
            props = _objectWithoutProperties(_ref, ['intl', 'children']);

        var i18n = {
            t: function t(id, values) {
                return intl.formatMessage({ id: id }, values);
            }
        };

        return React.createElement(
            Component,
            _extends({}, props, { i18n: i18n }),
            children
        );
    });
}

/**
 * Connect a component to the GitBook context (store and actions).
 *
 * @param {ReactComponent} Component
 * @param {Function} mapStateToProps
 * @return {ReactComponent}
 */
function connect(Component, mapStateToProps, mapActionsToProps) {
    Component = ReactRedux.connect(mapStateToProps)(Component);
    Component = connectToI18n(Component);
    Component = connectToActions(Component, mapActionsToProps);

    return Component;
}

module.exports = connect;