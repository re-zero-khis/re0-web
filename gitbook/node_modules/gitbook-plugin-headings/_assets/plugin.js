(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.GitBookPlugin = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());

},{}],2:[function(require,module,exports){
'use strict';

var GitBook = require('gitbook-core');
var React = GitBook.React;

var classNames = require('classnames');

function mapStateToProps(_ref) {
    var config = _ref.config;

    return {
        position: config.getIn(['pluginsConfig', 'headings', 'position'], 'left')
    };
}

var Heading = React.createClass({
    displayName: 'Heading',

    propTypes: {
        id: React.PropTypes.string.isRequired,
        children: React.PropTypes.node.isRequired,
        position: React.PropTypes.string.isRequired
    },

    render: function render() {
        var _props = this.props,
            position = _props.position,
            children = _props.children,
            id = _props.id;

        var className = classNames('Headings-Container', {
            'Headings-Right': position !== 'left'
        });

        return React.createElement(
            'div',
            { className: className },
            React.createElement(GitBook.ImportCSS, { href: 'gitbook/headings/headings.css' }),
            position == 'left' ? React.createElement(
                'a',
                { className: 'Headings-Anchor-Left', href: '#' + id },
                React.createElement('i', { className: 'fa fa-link' })
            ) : null,
            children,
            position != 'left' ? React.createElement(
                'a',
                { className: 'Headings-Anchor-Right', href: '#' + id },
                React.createElement('i', { className: 'fa fa-link' })
            ) : null
        );
    }
});

Heading = GitBook.connect(Heading, mapStateToProps);

module.exports = GitBook.createPlugin({
    activate: function activate(dispatch, getState, _ref2) {
        var Components = _ref2.Components;

        // Attach component to titles
        dispatch(Components.registerComponent(Heading, { role: 'html:h1' }));
        dispatch(Components.registerComponent(Heading, { role: 'html:h2' }));
        dispatch(Components.registerComponent(Heading, { role: 'html:h3' }));
        dispatch(Components.registerComponent(Heading, { role: 'html:h4' }));
        dispatch(Components.registerComponent(Heading, { role: 'html:h5' }));
        dispatch(Components.registerComponent(Heading, { role: 'html:h6' }));
    },
    deactivate: function deactivate(dispatch, getState) {},
    reduce: function reduce(state, action) {
        return state;
    }
});

},{"classnames":1,"gitbook-core":"gitbook-core"}]},{},[2])(2)
});