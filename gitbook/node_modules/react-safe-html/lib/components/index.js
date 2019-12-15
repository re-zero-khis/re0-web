'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var React = require('react');

exports.createSimpleElement = createSimpleElement;
exports.makeElements = makeElements;

function createSimpleElement(tag, allowed) {
  var extraProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return function (props) {
    var resultProps = {};
    Object.keys(allowed).forEach(function (allowedKey) {
      if (props[allowedKey]) {
        var result = props[allowedKey];

        if (typeof allowed[allowedKey] === 'function') {
          var _allowed$allowedKey = allowed[allowedKey](result);

          var _allowed$allowedKey2 = _slicedToArray(_allowed$allowedKey, 2);

          allowedKey = _allowed$allowedKey2[0];
          result = _allowed$allowedKey2[1];
        }

        resultProps[allowedKey] = result;
      }
    });

    Object.assign(resultProps, extraProps);

    return React.createElement.apply(React, [tag, resultProps].concat(_toConsumableArray(props.children || [])));
  };
}

var standardAllowedProps = {};

exports.standardAllowedProps = standardAllowedProps;

function makeElements() {
  var standardAllowedProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var elements = {};
  var makeSimple = function makeSimple(tag) {
    var extraAllowededProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var extraProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return createSimpleElement(tag, _extends({}, standardAllowedProps, extraAllowededProps), extraProps);
  };
  var makeSimpleAndAssign = function makeSimpleAndAssign(tag) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return elements[tag] = makeSimple.apply(undefined, [tag].concat(args));
  };

  // Basic elements
  makeSimpleAndAssign('div');
  makeSimpleAndAssign('span');
  makeSimpleAndAssign('a', {
    href: function href(value) {
      var proto = value.split(':').shift();
      if (proto !== 'http' && proto !== 'https' && proto !== 'ftp') {
        value = undefined;
      }
      return ['href', value];
    }
  });
  makeSimpleAndAssign('img', {
    width: true,
    height: true,
    src: true
  });
  makeSimpleAndAssign('p');

  // Style
  makeSimpleAndAssign('b');
  makeSimpleAndAssign('strong');
  makeSimpleAndAssign('i');
  makeSimpleAndAssign('em');
  makeSimpleAndAssign('u');
  makeSimpleAndAssign('strike');

  // Tables
  makeSimpleAndAssign('table');
  makeSimpleAndAssign('tr');
  makeSimpleAndAssign('td');
  makeSimpleAndAssign('tbody');
  makeSimpleAndAssign('thead');

  // Headers
  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7'].forEach(function (tag) {
    return makeSimpleAndAssign(tag);
  });

  return elements;
}