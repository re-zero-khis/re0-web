'use strict';

var React = require('react');

var _require = require('react-immutable-proptypes'),
    listOf = _require.listOf;

var _React$PropTypes = React.PropTypes,
    string = _React$PropTypes.string,
    shape = _React$PropTypes.shape;


var Article = require('./SummaryArticle');

module.exports = shape({
    title: string.isRequired,
    articles: listOf(Article)
});