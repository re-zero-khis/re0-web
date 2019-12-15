'use strict';

var React = require('react');
var _React$PropTypes = React.PropTypes,
    string = _React$PropTypes.string,
    shape = _React$PropTypes.shape;


module.exports = shape({
    id: string.isRequired,
    title: string.isRequired
});