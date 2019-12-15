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

    var m = _ref.m;
    var mx = _ref.mx;
    var my = _ref.my;
    var mt = _ref.mt;
    var mr = _ref.mr;
    var mb = _ref.mb;
    var ml = _ref.ml;
    var gutter = _ref.gutter;

    var getScaledProp = (0, _getNumberProp2.default)(scale);

    var style = (0, _objectAssign2.default)({}, getScaledProp('margin')(m), getScaledProp('marginTop')(mt), getScaledProp('marginBottom')(mb), getScaledProp('marginTop')(my), getScaledProp('marginBottom')(my), getScaledProp('marginLeft')(ml), getScaledProp('marginRight')(mr), getScaledProp('marginLeft')(mx), getScaledProp('marginRight')(mx), getScaledProp('marginLeft')(-gutter), getScaledProp('marginRight')(-gutter));

    return style;
  };
};

var margin = setScale();

exports.default = margin;