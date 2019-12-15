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

var Grid = function Grid(_ref) {
  var align = _ref.align,
      className = _ref.className,
      style = _ref.style,
      props = _objectWithoutProperties(_ref, ['align', 'className', 'style']);

  var cx = 'Grid' + (className ? ' ' + className : '');
  var sx = _extends({
    verticalAlign: align
  }, style);

  return _react2.default.createElement(Base, _extends({ inlineBlock: true }, props, { style: sx, className: cx }));
};

Grid.propTypes = {
  align: _react2.default.PropTypes.oneOf(['top', 'middle', 'bottom', 'baseline'])
};

Grid.defaultProps = {
  align: 'top'
};

exports.default = Grid;