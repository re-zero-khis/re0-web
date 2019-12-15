'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _prefix = require('./prefix');

var _prefix2 = _interopRequireDefault(_prefix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var kebab = function kebab(str) {
  return str.replace(/([A-Z])/g, function (g) {
    return '-' + g.toLowerCase();
  });
};

var display = function display() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var block = _ref.block;
  var inlineBlock = _ref.inlineBlock;
  var inline = _ref.inline;
  var table = _ref.table;
  var tableRow = _ref.tableRow;
  var tableCell = _ref.tableCell;
  var flex = _ref.flex;
  var inlineFlex = _ref.inlineFlex;

  var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var _ref2$prefixed = _ref2.prefixed;
  var prefixed = _ref2$prefixed === undefined ? true : _ref2$prefixed;

  var props = {
    block: block,
    inlineBlock: inlineBlock,
    inline: inline,
    table: table,
    tableRow: tableRow,
    tableCell: tableCell,
    flex: flex,
    inlineFlex: inlineFlex
  };
  var key = Object.keys(props).reduce(function (a, b) {
    return a || (props[b] === true ? b : null);
  }, null);

  if (!key) {
    return null;
  }

  var val = kebab(key);

  var style = (0, _objectAssign2.default)({}, {
    display: val
  });

  return prefixed ? (0, _prefix2.default)(style) : style;
};

exports.default = display;