'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

// Small library-specific style prefixer for flexbox properties

var getPrefixedValue = function getPrefixedValue(prop, val) {
  try {
    var div = document.createElement('div');
    div.style[prop] = val;
    return div.style[prop] === val ? val : '-webkit-' + val;
  } catch (e) {
    return val;
  }
};

var prefixProp = function prefixProp(prop) {
  return function (prefix) {
    return prefix + prop.charAt(0).toUpperCase() + prop.slice(1);
  };
};

var prefixer = function prefixer() {
  var style = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var prefixed = {};

  for (var key in style) {
    var val = style[key];
    var webkitKey = void 0;
    var msKey = void 0;

    switch (key) {
      case 'flexDirection':
      case 'flexWrap':
      case 'alignItems':
      case 'justifyContent':
      case 'flex':
        webkitKey = prefixProp(key)('Webkit');
        msKey = prefixProp(key)('ms');
        prefixed[webkitKey] = val;
        prefixed[msKey] = val;
        prefixed[key] = val;
        break;
      case 'order':
        webkitKey = prefixProp(key)('Webkit');
        msKey = prefixProp(key)('msFlex');
        prefixed[webkitKey] = val;
        prefixed[msKey] = val;
        prefixed[key] = val;
        break;
      default:
        prefixed[key] = val;
    }

    switch (val) {
      case 'flex':
      case 'inline-flex':
        prefixed[key] = getPrefixedValue('display', val);
        break;
    }
  }

  return prefixed;
};

exports.default = prefixer;