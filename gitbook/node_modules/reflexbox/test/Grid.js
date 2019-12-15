
import React from 'react'
import test from 'ava'
import { mount } from 'enzyme'
import jsdom from 'jsdom-global'
import { Grid } from '../src'

let wrapper
let inner

jsdom()

window.matchMedia = () => ({
  matches: false,
  addListener: () => {},
  removeListener: () => {}
})

test('renders', t => {
  t.notThrows(() => {
    wrapper = mount(<Grid col={6} p={2} />)
    inner = wrapper.find('ReflexWrap')
  })
})

test('passes props', t => {
  t.deepEqual(inner.props(), {
    className: 'Grid',
    inlineBlock: true,
    col: 6,
    p: 2,
    style: {
      verticalAlign: 'top'
    }
  })
})

test('passes align prop', t => {
  wrapper = mount(<Grid align='middle' />)
  inner = wrapper.find('ReflexWrap')
  t.is(inner.props().style.verticalAlign, 'middle')
})

test('passes className prop', t => {
  wrapper = mount(<Grid className='hello' />)
  inner = wrapper.find('ReflexWrap')
  t.is(inner.props().className, 'Grid hello')
})

test('applies vertical-align styles', t => {
  t.is(inner.props().style.verticalAlign, 'top')
})

test('applies styles', t => {
  wrapper = mount(<Grid m={2} />)
  inner = wrapper.find('div')
  t.is(typeof inner.props().style.margin, 'number')
})

