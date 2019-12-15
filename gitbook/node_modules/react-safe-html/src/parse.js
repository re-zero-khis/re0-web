var cheerio = require('cheerio');
var htmlparser = require('htmlparser2');
var {AllHtmlEntities} = require('html-entities');
var entities = new AllHtmlEntities();

type ReactSafeNode = {
  type: string;
  props: {};
  children: Array<ReactSafeNode>
};

module.exports = function parse(str): Array<ReactSafeNode> {
  var result = {type: 'div', props: {}, children: []};
  var stack = [result];
  var parser = new htmlparser.Parser({
    onopentag: (name, attribs) => {
      var element:ReactSafeNode = {type: name, props: attribs, children: []};
      stack[stack.length - 1].children.push(element);
      stack.push(element);
    },
    ontext: (text) => {
      stack[stack.length - 1].children.push(entities.decode(text));
    },
    onclosetag: (name) => {
      stack.pop();
    },
  });
  parser.write(str);
  parser.end();
  return result;
}

