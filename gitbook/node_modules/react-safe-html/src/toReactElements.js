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
    }
    else {
      return node;
    }
  }

  var children = node.children.map((child, i) => {
    var element = toReactElements(child, components);
    return element;
  });
  var type = components[node.type];
  if (!type) {
    return React.createElement('span', {}, ...children);
  }
  return React.createElement(type, node.props, ...children);
}

