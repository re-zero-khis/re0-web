'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getNumberProp = function getNumberProp(scale) {
  return function (key) {
    return function (x) {
      if (x === 'auto') {
        return _defineProperty({}, key, 'auto');
      }
      var multiplier = x < 0 ? -1 : 1;
      x = Math.abs(x);

      if (!Number.isInteger(x) || typeof scale[x] === 'undefined') {
        return null;
      }

      return _defineProperty({}, key, scale[x] * multiplier);
    };
  };
};

exports.default = getNumberProp;