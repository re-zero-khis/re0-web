'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getProp = function getProp(scale) {
  return function (key) {
    return function (x) {
      return typeof x === 'number' ? _defineProperty({}, key, scale[x]) : null;
    };
  };
};

exports.default = getProp;