'use strict';

var cheerio = require('cheerio');
var htmlparser = require('htmlparser2');

var _require = require('html-entities');

var AllHtmlEntities = _require.AllHtmlEntities;

var entities = new AllHtmlEntities();

module.exports = function parse(str) {
  var result = { type: 'div', props: {}, children: [] };
  var stack = [result];
  var parser = new htmlparser.Parser({
    onopentag: function onopentag(name, attribs) {
      var element = { type: name, props: attribs, children: [] };
      stack[stack.length - 1].children.push(element);
      stack.push(element);
    },
    ontext: function ontext(text) {
      stack[stack.length - 1].children.push(entities.decode(text));
    },
    onclosetag: function onclosetag(name) {
      stack.pop();
    }
  });
  parser.write(str);
  parser.end();
  return result;
};