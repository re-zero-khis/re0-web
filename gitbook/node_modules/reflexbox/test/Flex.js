
import React from 'react'
import test from 'ava'
import { mount } from 'enzyme'
import jsdom from 'jsdom-global'
import { Flex } from '../src'

let wrapper
let inner

jsdom()

window.matchMedia = () => ({
  matches: false,
  addListener: () => {},
  removeListener: () => {}
})

test('renders', t => {
  wrapper = mount(<Flex className='hello' p={2} />)
  t.notThrows(() => {
    inner = wrapper.find('ReflexWrap')
  })
})

test('passes props', t => {
  const props = inner.props()
  t.true(props.flex)
  t.is(props.className, 'Flex hello')
  t.is(props.p, 2)
})

test('applies styles', t => {
  inner = wrapper.find('div')
  t.is(typeof inner.props().style.display, 'string')
})

