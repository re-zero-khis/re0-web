'use strict';

var ruled = function ruled() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref$size = _ref.size;
  var size = _ref$size === undefined ? 8 : _ref$size;
  var _ref$strokeWidth = _ref.strokeWidth;
  var strokeWidth = _ref$strokeWidth === undefined ? 1 : _ref$strokeWidth;
  var _ref$horizontal = _ref.horizontal;
  var horizontal = _ref$horizontal === undefined ? true : _ref$horizontal;
  var _ref$vertical = _ref.vertical;
  var vertical = _ref$vertical === undefined ? true : _ref$vertical;
  var _ref$color = _ref.color;
  var color = _ref$color === undefined ? 'rgba(0, 255, 255, .125)' : _ref$color;

  var backgrounds = [];

  if (horizontal) {
    backgrounds.push('linear-gradient(transparent ' + (size - strokeWidth) + 'px, ' + color + ' ' + size + 'px)');
  }

  if (vertical) {
    backgrounds.push('linear-gradient(90deg, transparent ' + (size - strokeWidth) + 'px, ' + color + ' ' + size + 'px)');
  }

  return backgrounds.join();
};

module.exports = ruled;