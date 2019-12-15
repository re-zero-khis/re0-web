'use strict';

var React = require('react');
var Mousetrap = require('mousetrap');

var _require = require('immutable'),
    Map = _require.Map;

/**
 * Defines hotkeys globally when this component is mounted.
 *
 * keyMap = {
 *   'escape': (e) => quit()
 *   'mod+s': (e) => save()
 * }
 *
 * <HotKeys keyMap={keyMap}>
 *   < ... />
 * </HotKeys>
 */

var HotKeys = React.createClass({
    displayName: 'HotKeys',

    propTypes: {
        children: React.PropTypes.node.isRequired,
        keyMap: React.PropTypes.objectOf(React.PropTypes.func)
    },

    getDefaultProps: function getDefaultProps() {
        return { keyMap: {} };
    },
    updateBindings: function updateBindings(keyMap) {
        Map(keyMap).forEach(function (handler, key) {
            Mousetrap.bind(key, handler);
        });
    },
    clearBindings: function clearBindings(keyMap) {
        Map(keyMap).forEach(function (handler, key) {
            Mousetrap.unbind(key, handler);
        });
    },
    componentDidMount: function componentDidMount() {
        this.updateBindings(this.props.keyMap);
    },
    componentDidUpdate: function componentDidUpdate(prevProps) {
        this.clearBindings(prevProps.keyMap);
        this.updateBindings(this.props.keyMap);
    },
    componentWillUnmount: function componentWillUnmount() {
        this.clearBindings(this.props.keyMap);
    },
    render: function render() {
        // Simply render the only child
        return React.Children.only(this.props.children);
    }
});

module.exports = HotKeys;