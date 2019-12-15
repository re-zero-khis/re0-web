'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setColumns = exports.createWidthScale = undefined;

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _getProp = require('./get-prop');

var _getProp2 = _interopRequireDefault(_getProp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createWidthScale = exports.createWidthScale = function createWidthScale(length) {
  return Array.apply(null, Array(length + 1)).map(function (n, i) {
    return i / length * 100 + '%';
  });
};

var setColumns = exports.setColumns = function setColumns() {
  var columns = arguments.length <= 0 || arguments[0] === undefined ? 12 : arguments[0];
  return function () {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var col = _ref.col;
    var xs = _ref.xs;
    var sm = _ref.sm;
    var md = _ref.md;
    var lg = _ref.lg;

    var widthScale = createWidthScale(columns);
    var getWidth = (0, _getProp2.default)(widthScale)('width');
    var widths = (0, _objectAssign2.default)({}, getWidth(col));

    return widths;
  };
};

var column = setColumns();

exports.default = column;