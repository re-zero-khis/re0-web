'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var ReactSafeHtml = require('react-safe-html');

var _require = require('react-dom/lib/ReactInjection'),
    DOMProperty = _require.DOMProperty;

var htmlTags = require('html-tags');
var entities = require('entities');

var _require2 = require('./InjectedComponent'),
    InjectedComponent = _require2.InjectedComponent;

DOMProperty.injectDOMPropertyConfig({
    Properties: {
        align: DOMProperty.MUST_USE_ATTRIBUTE
    },
    isCustomAttribute: function isCustomAttribute(attributeName) {
        return attributeName === 'align';
    }
});

/*
    HTMLContent is a container for the page HTML that parse the content and
    render the right block.
    All html elements can be extended using the injected component.
 */

function inject(injectedProps, Component) {
    return function (props) {
        var cleanProps = _extends({}, props, {
            className: props['class']
        });
        delete cleanProps['class'];

        return React.createElement(
            InjectedComponent,
            injectedProps(cleanProps),
            React.createElement(Component, cleanProps)
        );
    };
}

var COMPONENTS = {
    // Templating blocks are exported as <xblock name="youtube" props="{}" />
    'xblock': inject(function (_ref) {
        var name = _ref.name,
            props = _ref.props;

        props = entities.decodeHTML(props);
        return {
            matching: { role: 'block:' + name },
            props: JSON.parse(props)
        };
    }, function (props) {
        return React.createElement('div', props);
    })
};

htmlTags.forEach(function (tag) {
    COMPONENTS[tag] = inject(function (props) {
        return {
            matching: { role: 'html:' + tag },
            props: props
        };
    }, function (props) {
        return React.createElement(tag, props);
    });
});

var HTMLContent = React.createClass({
    displayName: 'HTMLContent',

    propTypes: {
        html: React.PropTypes.string.isRequired
    },

    render: function render() {
        var html = this.props.html;

        return React.createElement(ReactSafeHtml, { html: html, components: COMPONENTS });
    }
});

module.exports = HTMLContent;