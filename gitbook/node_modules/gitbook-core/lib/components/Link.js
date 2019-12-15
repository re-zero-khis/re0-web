'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var ReactRedux = require('react-redux');

var File = require('../models/File');
var SummaryArticle = require('../models/SummaryArticle');
var SummaryArticleShape = require('../propTypes/SummaryArticle');
var FileShape = require('../propTypes/File');

/**
 * Link to another page or file in the book. Using this component instead of <a>
 * avoid broken links when location changes.
 *
 * @type {ReactClass}
 */
var Link = React.createClass({
    displayName: 'Link',

    propTypes: {
        currentFile: FileShape,
        children: React.PropTypes.node,

        // Destination of the link
        to: React.PropTypes.oneOfType([React.PropTypes.string, SummaryArticleShape, FileShape])
    },

    render: function render() {
        var _props = this.props,
            currentFile = _props.currentFile,
            to = _props.to,
            children = _props.children,
            props = _objectWithoutProperties(_props, ['currentFile', 'to', 'children']);

        var href = to;
        delete props.dispatch;

        if (SummaryArticle.is(to) || File.is(to)) {
            href = to.url;
        }

        href = currentFile.relative(href);
        return React.createElement(
            'a',
            _extends({ href: href }, props),
            children
        );
    }
});

module.exports = ReactRedux.connect(function (state) {
    return { currentFile: state.file };
})(Link);