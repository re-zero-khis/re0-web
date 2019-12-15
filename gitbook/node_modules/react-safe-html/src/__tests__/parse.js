var parse = require('../parse.js');
var {expect} = require('chai');
var log = (x) => console.log(JSON.stringify(x, null, 2));

describe('parse', () => {
  it('parses a simple string', () => {
    var res = parse('<x a="b">foo</x>');
    log(res);
    expect(res).to.deep.equal({
      type: 'div', props: {}, children: [
        {type: 'x', props: {a: 'b'}, children: ['foo']}
      ],
    });
  });
});

