
import React from 'react'
import test from 'ava'
import { mount } from 'enzyme'
import jsdom from 'jsdom-global'
import { Box } from '../src'

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
    wrapper = mount(<Box col={6} p={2} />)
    inner = wrapper.find('ReflexWrap')
  })
})

test('passes props', t => {
  t.deepEqual(inner.props(), {
    className: 'Box',
    col: 6,
    p: 2
  })
})

test('passes className prop', t => {
  wrapper = mount(<Box className='hello' />)
  inner = wrapper.find('ReflexWrap')
  t.is(inner.props().className, 'Box hello')
})

test('applies styles', t => {
  wrapper = mount(<Box flex />)
  inner = wrapper.find('div')
  t.is(typeof inner.props().style.display, 'string')
})

