'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _withReflex = require('./withReflex');

var _withReflex2 = _interopRequireDefault(_withReflex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Base = (0, _withReflex2.default)()('div');

var Box = function Box(_ref) {
  var className = _ref.className,
      props = _objectWithoutProperties(_ref, ['className']);

  var cx = 'Box' + (className ? ' ' + className : '');

  return _react2.default.createElement(Base, _extends({}, props, { className: cx }));
};

exports.default = Box;