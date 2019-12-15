'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var React = require('react');

module.exports = function toReactElements(node, components) {
  if (typeof node === 'string') {
    if (components['#text']) {
      var result = components['#text'](node);
      if (!result || !result.type) {
        console.error('react-safe-html #text component didn\'t return a react element');
        return node;
      }
      return result;
    } else {
      return node;
    }
  }

  var children = node.children.map(function (child, i) {
    var element = toReactElements(child, components);
    return element;
  });
  var type = components[node.type];
  if (!type) {
    return React.createElement.apply(React, ['span', {}].concat(_toConsumableArray(children)));
  }
  return React.createElement.apply(React, [type, node.props].concat(_toConsumableArray(children)));
};