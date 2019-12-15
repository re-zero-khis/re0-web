
import React from 'react'
import test from 'ava'
import { mount } from 'enzyme'
import jsdom from 'jsdom-global'
import { withReflex } from '../src'

let wrapper
let button
let inner

jsdom()

let MATCHES = null

window.matchMedia = query => ({
  get matches () { return MATCHES ? MATCHES.test(query) : false },
  addListener: () => {},
  removeListener: () => {}
})

const Box = withReflex()('div')
const Button = withReflex()(p => <button {...p} />)

test('renders', t => {
  t.notThrows(() => {
    button = mount(<Button flex col={6} />)
    wrapper = mount(<Box flex col={6} p={2} />)
    inner = wrapper.find('ReflexWrap')
  })
})

test('passes props', t => {
  t.deepEqual(inner.props(), {
    flex: true,
    col: 6,
    p: 2
  })
  t.deepEqual(button.find('ReflexWrap').props(), {
    flex: true,
    col: 6
  })
})

test('applies styles', t => {
  const { style } = wrapper.find('div').props()
  t.is(typeof style.display, 'string')
  t.is(typeof button.find('button').props().style.display, 'string')
})

test('passes style prop', t => {
  wrapper = mount(<Box style={{ color: 'tomato' }} />)
  inner = wrapper.find('ReflexWrap')
  const { style } = wrapper.find('div').props()
  t.is(style.color, 'tomato')
})

// Placeholder test for getWidth function
test('renames `column` prop', t => {
  wrapper = mount(<Box column />)
  inner = wrapper.find('WrappedComponent')
  t.deepEqual(inner.props(), {
    col: null,
    flexColumn: true,
    style: null
  })
})

test('renames `auto` prop', t => {
  wrapper = mount(<Box auto />)
  inner = wrapper.find('WrappedComponent')
  t.deepEqual(inner.props(), {
    col: null,
    flexAuto: true,
    style: null
  })
})

test('sm breakpoint', t => {
  MATCHES = /40/
  wrapper = mount(<Box col={6} sm={3} md={2} lg={1} />)
  inner = wrapper.find('WrappedComponent')

  t.deepEqual(inner.props(), {
    col: 3,
    style: null
  })
})

test('md breakpoint', t => {
  MATCHES = /52/
  wrapper = mount(<Box col={6} sm={3} md={2} lg={1} />)
  inner = wrapper.find('WrappedComponent')

  t.deepEqual(inner.props(), {
    col: 2,
    style: null
  })
})

test('lg breakpoint', t => {
  MATCHES = /64/
  wrapper = mount(<Box col={6} sm={3} md={2} lg={1} />)
  inner = wrapper.find('WrappedComponent')

  t.deepEqual(inner.props(), {
    col: 1,
    style: null
  })
})

test('custom breakpoints', t => {
  MATCHES = /24/
  wrapper = mount(<Box col={6} sm={3} md={2} lg={1} />, {
    context: {
      reflexbox: {
        breakpoints: {
          sm: '(min-width:24em)',
          md: '(min-width:36em)',
          lg: '(min-width:48em)'
        }
      }
    }
  })
  inner = wrapper.find('WrappedComponent')

  t.deepEqual(inner.props(), {
    col: 3,
    style: null
  })
})

// Needs work
test('accepts ref attribute', t => {
  class Root extends React.Component {
    render () {
      return (
        <div>
          <Box ref='box' />
        </div>
      )
    }
  }
  wrapper = mount(<Root />)
  t.truthy(wrapper.ref('box'))
})
