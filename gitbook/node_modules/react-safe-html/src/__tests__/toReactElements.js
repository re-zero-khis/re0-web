var toReactElements = require('../toReactElements.js');
var log = (x) => console.log(JSON.stringify(x, null, 2));
var basicTypes = {
  div: () => ({}),
};

it('toReactElements basic', () => {
  var res = toReactElements({
    type: 'div', props: {}, children: [
      {type: 'not-allowed', props: {skipThis: true}, children: ['a child']}
    ],
  }, basicTypes);
  expect(res).toMatchSnapshot();
});

it('toReactElements override text', () => {
  var types = {
    '#text': (text) => ({type: 'p', props: {'data-foo': 'bar', children: [text]}}),
  };
  var res = toReactElements({
    type: 'div', props: {}, children: [
      {type: 'not-allowed', props: {skipThis: true}, children: ['a child']}
    ],
  }, types);
  log(res);
  expect(res).toMatchSnapshot();
});

