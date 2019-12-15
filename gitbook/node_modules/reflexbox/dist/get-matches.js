'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('./config');

var getMatches = function getMatches() {
  var breakpoints = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _config.breakpoints;

  var matches = [];

  if (typeof window !== 'undefined') {
    for (var key in breakpoints) {
      if (window.matchMedia(breakpoints[key]).matches) {
        matches.push(key);
      }
    }
  }

  return matches;
};

exports.default = getMatches;