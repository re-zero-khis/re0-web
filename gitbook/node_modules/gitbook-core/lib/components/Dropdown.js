'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var classNames = require('classnames');

/**
 * Dropdown to display a menu
 *
 * <Dropdown.Container>
 *
 *     <Button />
 *
 *     <Dropdown.Menu>
 *         <Dropdown.Item href={...}> ... </Dropdown.Item>
 *         <Dropdown.Item onClick={...}> ... </Dropdown.Item>
 *     </Dropdown.Menu>
 * </Dropdown.Container>
 */

var DropdownContainer = React.createClass({
    displayName: 'DropdownContainer',

    propTypes: {
        className: React.PropTypes.string,
        children: React.PropTypes.node
    },

    render: function render() {
        var _props = this.props,
            className = _props.className,
            children = _props.children;


        className = classNames('GitBook-Dropdown', className);

        return React.createElement(
            'div',
            { className: className },
            children
        );
    }
});

/**
 * A dropdown item which can contains informations.
 */
var DropdownItem = React.createClass({
    displayName: 'DropdownItem',

    propTypes: {
        children: React.PropTypes.node
    },

    render: function render() {
        var children = this.props.children;


        return React.createElement(
            'div',
            { className: 'GitBook-DropdownItem' },
            children
        );
    }
});

/**
 * A dropdown item, which is always a link.
 */
var DropdownItemLink = React.createClass({
    displayName: 'DropdownItemLink',

    propTypes: {
        children: React.PropTypes.node,
        onClick: React.PropTypes.func,
        href: React.PropTypes.string
    },

    onClick: function onClick(event) {
        var _props2 = this.props,
            onClick = _props2.onClick,
            href = _props2.href;


        if (href) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (onClick) {
            onClick();
        }
    },
    render: function render() {
        var _props3 = this.props,
            children = _props3.children,
            href = _props3.href,
            otherProps = _objectWithoutProperties(_props3, ['children', 'href']);

        return React.createElement(
            'a',
            _extends({}, otherProps, { className: 'GitBook-DropdownItemLink', href: href || '#', onClick: this.onClick }),
            children
        );
    }
});

/**
 * A DropdownMenu to display DropdownItems. Must be inside a
 * DropdownContainer.
 */
var DropdownMenu = React.createClass({
    displayName: 'DropdownMenu',

    propTypes: {
        className: React.PropTypes.string,
        children: React.PropTypes.node
    },

    render: function render() {
        var _props4 = this.props,
            className = _props4.className,
            children = _props4.children;

        className = classNames('GitBook-DropdownMenu', className);

        return React.createElement(
            'div',
            { className: className },
            children
        );
    }
});

var Dropdown = {
    Item: DropdownItem,
    ItemLink: DropdownItemLink,
    Menu: DropdownMenu,
    Container: DropdownContainer
};

module.exports = Dropdown;