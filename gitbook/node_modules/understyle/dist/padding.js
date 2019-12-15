'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setScale = undefined;

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _getNumberProp = require('./get-number-prop');

var _getNumberProp2 = _interopRequireDefault(_getNumberProp);

var _initialScale = require('./initial-scale');

var _initialScale2 = _interopRequireDefault(_initialScale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setScale = exports.setScale = function setScale() {
  var scale = arguments.length <= 0 || arguments[0] === undefined ? _initialScale2.default : arguments[0];
  return function () {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var p = _ref.p;
    var px = _ref.px;
    var py = _ref.py;
    var pt = _ref.pt;
    var pr = _ref.pr;
    var pb = _ref.pb;
    var pl = _ref.pl;

    var getScaledProp = (0, _getNumberProp2.default)(scale);

    var style = (0, _objectAssign2.default)({}, getScaledProp('padding')(p), getScaledProp('paddingTop')(pt), getScaledProp('paddingBottom')(pb), getScaledProp('paddingTop')(py), getScaledProp('paddingBottom')(py), getScaledProp('paddingLeft')(pl), getScaledProp('paddingRight')(pr), getScaledProp('paddingLeft')(px), getScaledProp('paddingRight')(px));

    return style;
  };
};

var padding = setScale();

exports.default = padding;