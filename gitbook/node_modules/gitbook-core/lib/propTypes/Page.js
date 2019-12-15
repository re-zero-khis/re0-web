'use strict';

var React = require('react');
var _React$PropTypes = React.PropTypes,
    oneOf = _React$PropTypes.oneOf,
    string = _React$PropTypes.string,
    number = _React$PropTypes.number,
    shape = _React$PropTypes.shape;


module.exports = shape({
    title: string.isRequired,
    content: string.isRequired,
    level: string.isRequired,
    depth: number.isRequired,
    dir: oneOf(['ltr', 'rtl']).isRequired
});