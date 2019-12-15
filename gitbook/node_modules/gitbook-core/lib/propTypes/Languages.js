'use strict';

var React = require('react');

var _require = require('react-immutable-proptypes'),
    listOf = _require.listOf;

var _React$PropTypes = React.PropTypes,
    shape = _React$PropTypes.shape,
    string = _React$PropTypes.string;


var fileShape = require('./File');
var languageShape = require('./Language');

module.exports = shape({
    current: string.isRequired,
    file: fileShape.isRequired,
    list: listOf(languageShape).isRequired
});