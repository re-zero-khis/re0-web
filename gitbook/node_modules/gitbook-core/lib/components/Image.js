'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var ReactRedux = require('react-redux');

var File = require('../models/File');
var FileShape = require('../propTypes/File');

/**
 * Local image. Using this component instead of <img>
 * avoid broken links when location changes.
 *
 * @type {ReactClass}
 */
var Image = React.createClass({
    displayName: 'Image',

    propTypes: {
        currentFile: FileShape,
        src: React.PropTypes.oneOfType([React.PropTypes.string, FileShape])
    },

    render: function render() {
        var _props = this.props,
            src = _props.src,
            currentFile = _props.currentFile,
            props = _objectWithoutProperties(_props, ['src', 'currentFile']);

        delete props.dispatch;

        if (File.is(src)) {
            src = src.url;
        }

        src = currentFile.relative(src);
        return React.createElement('img', _extends({ src: src }, props));
    }
});

module.exports = ReactRedux.connect(function (state) {
    return { currentFile: state.file };
})(Image);