'use strict';

/* eslint-disable no-use-before-define */

var React = require('react');

var _require = require('react-immutable-proptypes'),
    list = _require.list;

var _React$PropTypes = React.PropTypes,
    string = _React$PropTypes.string,
    number = _React$PropTypes.number,
    shape = _React$PropTypes.shape;


var Article = shape({
    title: string.isRequired,
    depth: number.isRequired,
    path: string,
    url: string,
    ref: string,
    level: string,
    articles: list
});

module.exports = Article;