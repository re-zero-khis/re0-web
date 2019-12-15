'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _margin = require('./util/margin');

var _margin2 = _interopRequireDefault(_margin);

var _padding = require('./util/padding');

var _padding2 = _interopRequireDefault(_padding);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Base = function Base(_ref, _ref2) {
  var style = _ref.style;
  var className = _ref.className;
  var is = _ref.is;
  var _style = _ref._style;
  var _className = _ref._className;
  var gutter = _ref.gutter;
  var m = _ref.m;
  var mt = _ref.mt;
  var mr = _ref.mr;
  var mb = _ref.mb;
  var ml = _ref.ml;
  var mx = _ref.mx;
  var my = _ref.my;
  var p = _ref.p;
  var pt = _ref.pt;
  var pr = _ref.pr;
  var pb = _ref.pb;
  var pl = _ref.pl;
  var px = _ref.px;
  var py = _ref.py;

  var props = _objectWithoutProperties(_ref, ['style', 'className', 'is', '_style', '_className', 'gutter', 'm', 'mt', 'mr', 'mb', 'ml', 'mx', 'my', 'p', 'pt', 'pr', 'pb', 'pl', 'px', 'py']);

  var reflexbox = _ref2.reflexbox;

  var _config$reflexbox = _extends({}, _config2.default, reflexbox);

  var scale = _config$reflexbox.scale;


  var sx = (0, _objectAssign2.default)({ boxSizing: 'border-box' }, style, _style, (0, _margin2.default)({ gutter: gutter, m: m, mt: mt, mr: mr, mb: mb, ml: ml, mx: mx, my: my }, scale), (0, _padding2.default)({ p: p, pt: pt, pr: pr, pb: pb, pl: pl, px: px, py: py }, scale));

  var cx = className ? _className + ' ' + className : _className;
  var Component = is || 'div';

  return _react2.default.createElement(Component, _extends({}, props, {
    style: sx,
    className: cx }));
};

Base.propTypes = {
  /** Passes in a custom element or component */
  is: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.object, _react2.default.PropTypes.func]),
  _className: _react2.default.PropTypes.string,
  _style: _react2.default.PropTypes.object,

  /** Sets padding based on a scale of 0–4 */
  m: _react2.default.PropTypes.number,
  /** Sets padding-left and padding-right based on a scale of 0–4 */
  mx: _react2.default.PropTypes.number,
  /** Sets margin-top and margin-bottom based on a scale of 0–4 */
  my: _react2.default.PropTypes.number,
  /** Sets margin-top based on a scale of 0–4 */
  mt: _react2.default.PropTypes.number,
  /** Sets margin-bottom based on a scale of 0–4 */
  mb: _react2.default.PropTypes.number,
  /** Sets margin-left based on a scale of 0–4 */
  ml: _react2.default.PropTypes.number,
  /** Sets margin-right based on a scale of 0–4 */
  mr: _react2.default.PropTypes.number,

  /** Sets negative left and right margins to compensate for child component padding */
  gutter: _react2.default.PropTypes.number,

  /** Sets padding based on a scale of 0–4 */
  p: _react2.default.PropTypes.number,
  /** Sets padding-left and padding-right based on a scale of 0–4 */
  px: _react2.default.PropTypes.number,
  /** Sets padding-top and padding-bottom based on a scale of 0–4 */
  py: _react2.default.PropTypes.number,
  /** Sets padding-top based on a scale of 0–4 */
  pt: _react2.default.PropTypes.number,
  /** Sets padding-bottom based on a scale of 0–4 */
  pb: _react2.default.PropTypes.number,
  /** Sets padding-left based on a scale of 0–4 */
  pl: _react2.default.PropTypes.number,
  /** Sets padding-right based on a scale of 0–4 */
  pr: _react2.default.PropTypes.number
};

Base.contextTypes = {
  reflexbox: _react2.default.PropTypes.shape({
    breakpoints: _react2.default.PropTypes.object,
    scale: _react2.default.PropTypes.array
  })
};

exports.default = Base;