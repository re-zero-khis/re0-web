'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var n = function n(key, x, s) {
  return typeof x === 'number' ? _defineProperty({}, key, s[x]) : null;
};

function padding(props, scale) {
  scale = scale || [];

  var _ref2 = props || {};

  var p = _ref2.p;
  var px = _ref2.px;
  var py = _ref2.py;
  var pt = _ref2.pt;
  var pr = _ref2.pr;
  var pb = _ref2.pb;
  var pl = _ref2.pl;


  var result = (0, _objectAssign2.default)({}, n('padding', p, scale), n('paddingTop', pt, scale), n('paddingBottom', pb, scale), n('paddingTop', py, scale), n('paddingBottom', py, scale), n('paddingLeft', pl, scale), n('paddingRight', pr, scale), n('paddingLeft', px, scale), n('paddingRight', px, scale));

  return result;
}

exports.default = padding;