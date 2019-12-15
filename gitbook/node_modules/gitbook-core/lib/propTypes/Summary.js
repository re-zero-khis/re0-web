'use strict';

var React = require('react');

var _require = require('react-immutable-proptypes'),
    listOf = _require.listOf;

var shape = React.PropTypes.shape;


var File = require('./File');
var Part = require('./SummaryPart');

module.exports = shape({
    file: File.isRequired,
    parts: listOf(Part).isRequired
});