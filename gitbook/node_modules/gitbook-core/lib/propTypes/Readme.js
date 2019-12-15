'use strict';

var React = require('react');

var shape = React.PropTypes.shape;


var File = require('./File');

module.exports = shape({
    file: File.isRequired
});