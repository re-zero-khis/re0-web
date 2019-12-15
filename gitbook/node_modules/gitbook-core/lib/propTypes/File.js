'use strict';

var React = require('react');
var _React$PropTypes = React.PropTypes,
    oneOf = _React$PropTypes.oneOf,
    string = _React$PropTypes.string,
    instanceOf = _React$PropTypes.instanceOf,
    shape = _React$PropTypes.shape;


module.exports = shape({
    mtime: instanceOf(Date).isRequired,
    path: string.isRequired,
    type: oneOf(['', 'markdown', 'asciidoc']).isRequired
});