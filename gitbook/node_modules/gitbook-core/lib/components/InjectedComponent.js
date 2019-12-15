'use strict';

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var ReactRedux = require('react-redux');

var _require = require('immutable'),
    List = _require.List;

var _require2 = require('../actions/components'),
    findMatchingComponents = _require2.findMatchingComponents;

/*
    Public: InjectedComponent makes it easy to include a set of dynamically registered
    components inside of your React render method. Rather than explicitly render
    an array of buttons, for example, you can use InjectedComponentSet:

    ```js
    <InjectedComponentSet className="message-actions"
                      matching={{role: 'ThreadActionButton'}}
                      props={{ a: 1 }}>
    ```

    InjectedComponentSet will look up components registered for the location you provide,
    render them inside a {Flexbox} and pass them `exposedProps`. By default, all injected
    children are rendered inside {UnsafeComponent} wrappers to prevent third-party code
    from throwing exceptions that break React renders.

    InjectedComponentSet monitors the ComponentStore for changes. If a new component
    is registered into the location you provide, InjectedComponentSet will re-render.
    If no matching components is found, the InjectedComponent renders an empty span.
 */

var Injection = React.createClass({
    displayName: 'Injection',

    propTypes: {
        component: React.PropTypes.func,
        props: React.PropTypes.object,
        children: React.PropTypes.node
    },

    render: function render() {
        var Comp = this.props.component;
        var _props = this.props,
            props = _props.props,
            children = _props.children;

        // TODO: try to render with an error handling for unsafe component

        return React.createElement(
            Comp,
            props,
            children
        );
    }
});

var InjectedComponentSet = React.createClass({
    displayName: 'InjectedComponentSet',

    propTypes: {
        components: React.PropTypes.oneOfType([React.PropTypes.arrayOf(React.PropTypes.func), React.PropTypes.instanceOf(List)]).isRequired,
        props: React.PropTypes.object,
        children: React.PropTypes.node
    },

    render: function render() {
        var _props2 = this.props,
            components = _props2.components,
            props = _props2.props,
            children = _props2.children,
            divProps = _objectWithoutProperties(_props2, ['components', 'props', 'children']);

        delete divProps.matching;
        delete divProps.dispatch;

        var inner = components.map(function (Comp, i) {
            return React.createElement(Injection, { key: i, component: Comp, props: props });
        });

        return React.createElement(
            'div',
            divProps,
            children,
            inner
        );
    }
});

/**
 * Render only the first component matching
 */
var InjectedComponent = React.createClass({
    displayName: 'InjectedComponent',

    propTypes: {
        components: React.PropTypes.oneOfType([React.PropTypes.arrayOf(React.PropTypes.func), React.PropTypes.instanceOf(List)]).isRequired,
        props: React.PropTypes.object,
        children: React.PropTypes.node
    },

    render: function render() {
        var _props3 = this.props,
            components = _props3.components,
            props = _props3.props,
            children = _props3.children;


        if (!children) {
            children = null;
        } else {
            children = React.Children.only(children);
        }

        return components.reduce(function (inner, Comp) {
            return React.createElement(
                Injection,
                { component: Comp, props: props },
                inner
            );
        }, children);
    }
});

/**
 * Map Redux state to InjectedComponentSet's props
 */
function mapStateToProps(state, props) {
    var components = state.components;
    var matching = props.matching;


    return {
        components: findMatchingComponents(components, matching)
    };
}

var connect = ReactRedux.connect(mapStateToProps);

module.exports = {
    InjectedComponent: connect(InjectedComponent),
    InjectedComponentSet: connect(InjectedComponentSet)
};