'use strict';

var React = require('react');
var locationShape = require('./Location');
var _React$PropTypes = React.PropTypes,
    bool = _React$PropTypes.bool,
    shape = _React$PropTypes.shape;


module.exports = shape({
    loading: bool,
    location: locationShape
});