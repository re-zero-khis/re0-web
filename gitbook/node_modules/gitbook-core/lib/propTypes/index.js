'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var ImmutablePropTypes = require('react-immutable-proptypes');

module.exports = _extends({}, ImmutablePropTypes, {
    dispatch: React.PropTypes.func,
    I18n: require('./i18n'),
    Context: require('./Context'),
    Page: require('./Page'),
    File: require('./File'),
    History: require('./History'),
    Language: require('./Language'),
    Languages: require('./Languages'),
    Location: require('./Location'),
    Readme: require('./Readme'),
    Summary: require('./Summary'),
    SummaryPart: require('./SummaryPart'),
    SummaryArticle: require('./SummaryArticle')
});