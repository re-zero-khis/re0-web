'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUnderstyle = undefined;

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _display = require('./display');

var _display2 = _interopRequireDefault(_display);

var _flex = require('./flex');

var _flex2 = _interopRequireDefault(_flex);

var _margin = require('./margin');

var _padding = require('./padding');

var _column = require('./column');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createUnderstyle = exports.createUnderstyle = function createUnderstyle() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var scale = _ref.scale;
  var columns = _ref.columns;
  var _ref$prefixed = _ref.prefixed;
  var prefixed = _ref$prefixed === undefined ? true : _ref$prefixed;
  return function (props) {
    var margin = (0, _margin.setScale)(scale);
    var padding = (0, _padding.setScale)(scale);
    var column = (0, _column.setColumns)(columns);

    var style = (0, _objectAssign2.default)({}, {
      boxSizing: 'border-box'
    }, (0, _display2.default)(props, { prefixed: prefixed }), (0, _flex2.default)(props, { prefixed: prefixed }), margin(props), padding(props), column(props));

    return style;
  };
};

var understyle = createUnderstyle();

exports.default = understyle;