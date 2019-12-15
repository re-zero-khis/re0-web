'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Head = require('react-helmet');
var ReactRedux = require('react-redux');

/**
 * Resolve a file url to a relative url in current state
 * @param  {String} href
 * @param  {State} state
 * @return {String}
 */
function resolveForCurrentFile(href, state) {
    var file = state.file;

    return file.relative(href);
}

var ImportLink = ReactRedux.connect(function (state, _ref) {
    var rel = _ref.rel,
        href = _ref.href;

    href = resolveForCurrentFile(href, state);

    return {
        link: [{
            rel: rel,
            href: href
        }]
    };
})(Head);

var ImportScript = ReactRedux.connect(function (state, _ref2) {
    var type = _ref2.type,
        src = _ref2.src;

    src = resolveForCurrentFile(src, state);

    return {
        script: [{
            type: type,
            src: src
        }]
    };
})(Head);

var ImportCSS = function ImportCSS(props) {
    return React.createElement(ImportLink, _extends({ rel: 'stylesheet' }, props));
};

module.exports = {
    ImportLink: ImportLink,
    ImportScript: ImportScript,
    ImportCSS: ImportCSS
};