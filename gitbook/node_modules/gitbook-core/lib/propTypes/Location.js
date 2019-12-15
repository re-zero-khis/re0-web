'use strict';

var React = require('react');

var _require = require('react-immutable-proptypes'),
    map = _require.map;

var _React$PropTypes = React.PropTypes,
    string = _React$PropTypes.string,
    shape = _React$PropTypes.shape;


module.exports = shape({
    pathname: string,
    hash: string,
    query: map
});