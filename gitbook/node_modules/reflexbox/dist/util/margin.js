'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var a = function a(x) {
  return function (key) {
    return x === 'auto' ? _defineProperty({}, key, 'auto') : null;
  };
};

var n = function n(key, x, s, multiplier) {
  return typeof s[x] === 'number' ? _defineProperty({}, key, s[x] * (multiplier || 1)) : a(x)(key);
};

function margin(props, scale) {
  scale = scale || [];

  var _ref3 = props || {};

  var m = _ref3.m;
  var mx = _ref3.mx;
  var my = _ref3.my;
  var mt = _ref3.mt;
  var mr = _ref3.mr;
  var mb = _ref3.mb;
  var ml = _ref3.ml;
  var gutter = _ref3.gutter;


  var result = (0, _objectAssign2.default)({}, n('margin', m, scale), n('marginTop', mt, scale), n('marginBottom', mb, scale), n('marginTop', my, scale), n('marginBottom', my, scale), n('marginLeft', ml, scale), n('marginRight', mr, scale), n('marginLeft', mx, scale), n('marginRight', mx, scale), n('marginLeft', gutter, scale, -1), n('marginRight', gutter, scale, -1));

  return result;
}

exports.default = margin;