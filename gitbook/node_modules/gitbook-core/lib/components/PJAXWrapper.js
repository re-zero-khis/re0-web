'use strict';

var React = require('react');
var ReactRedux = require('react-redux');
var History = require('../actions/history');

/**
 * Check if an element is inside a link
 * @param {DOMElement} el
 * @param {String} name
 * @return {DOMElement|undefined
 */
function findParentByTagName(el, name) {
    while (el && el !== document) {
        if (el.tagName && el.tagName.toUpperCase() === name) {
            return el;
        }
        el = el.parentNode;
    }

    return false;
}

/**
 * Internal: Return the `href` component of given URL object with the hash
 * portion removed.
 *
 * @param {Location|HTMLAnchorElement} location
 * @return {String}
 */
function stripHash(location) {
    return location.href.replace(/#.*/, '');
}

/**
 * Test if a click event should be handled,
 * return the new url if it's a normal lcick
 */
function getHrefForEvent(event) {
    var link = findParentByTagName(event.target, 'A');

    if (!link) return;

    // Middle click, cmd click, and ctrl click should open
    // links in a new tab as normal.
    if (event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    // Ignore cross origin links
    if (location.protocol !== link.protocol || location.hostname !== link.hostname) return;

    // Ignore case when a hash is being tacked on the current URL
    if (link.href.indexOf('#') > -1 && stripHash(link) == stripHash(location)) return;

    // Ignore event with default prevented
    if (event.defaultPrevented) return;

    // Explicitly ignored
    if (link.getAttribute('data-nopjax')) return;

    return link.pathname;
}

/*
    Wrapper to bind all navigation events to fetch pages.
 */

var PJAXWrapper = React.createClass({
    displayName: 'PJAXWrapper',

    propTypes: {
        children: React.PropTypes.node,
        dispatch: React.PropTypes.func
    },

    onClick: function onClick(event) {
        var dispatch = this.props.dispatch;

        var href = getHrefForEvent(event);

        if (!href) {
            return;
        }

        event.preventDefault();
        dispatch(History.push(href));
    },
    componentDidMount: function componentDidMount() {
        document.addEventListener('click', this.onClick, false);
    },
    componentWillUnmount: function componentWillUnmount() {
        document.removeEventListener('click', this.onClick, false);
    },
    render: function render() {
        return React.Children.only(this.props.children);
    }
});

module.exports = ReactRedux.connect()(PJAXWrapper);