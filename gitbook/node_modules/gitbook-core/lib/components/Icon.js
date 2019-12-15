'use strict';

var React = require('react');

var Icon = React.createClass({
    displayName: 'Icon',

    propTypes: {
        id: React.PropTypes.string,
        type: React.PropTypes.string,
        className: React.PropTypes.string
    },

    getDefaultProps: function getDefaultProps() {
        return {
            type: 'fa'
        };
    },
    render: function render() {
        var _props = this.props,
            id = _props.id,
            type = _props.type;
        var className = this.props.className;


        if (id) {
            className = 'GitBook-Icon ' + type + ' ' + type + '-' + id;
        }

        return React.createElement('i', { className: className });
    }
});

module.exports = Icon;