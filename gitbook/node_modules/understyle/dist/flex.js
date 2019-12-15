'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _prefix = require('./prefix');

var _prefix2 = _interopRequireDefault(_prefix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var flex = function flex() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var wrap = _ref.wrap;
  var align = _ref.align;
  var justify = _ref.justify;
  var flexColumn = _ref.flexColumn;
  var flexAuto = _ref.flexAuto;
  var flexNone = _ref.flexNone;
  var order = _ref.order;
  var column = _ref.column;

  var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var _ref2$prefixed = _ref2.prefixed;
  var prefixed = _ref2$prefixed === undefined ? true : _ref2$prefixed;

  var style = (0, _objectAssign2.default)({}, wrap ? { flexWrap: 'wrap' } : null, align ? { alignItems: align } : null, justify ? { justifyContent: justify } : null, flexColumn || column ? { flexDirection: 'column' } : null, flexAuto ? { flex: '1 1 auto' } : null, flexNone ? { flex: 'none' } : null, typeof order === 'number' ? { order: order } : null);

  return prefixed ? (0, _prefix2.default)(style) : style;
};

exports.default = flex;