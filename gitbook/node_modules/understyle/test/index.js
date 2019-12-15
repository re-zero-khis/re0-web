
import test from 'ava'
import _style, {
  createUnderstyle,
  margin,
  padding,
  display,
  column,
  flex
} from '../src'

test('exports a default function', t => {
  t.is(typeof _style, 'function')
})

test('exports a createUnderstyle function', t => {
  t.is(typeof createUnderstyle, 'function')
})

test('exports a margin function', t => {
  t.is(typeof margin, 'function')
})

test('exports a padding function', t => {
  t.is(typeof padding, 'function')
})

test('exports a display function', t => {
  t.is(typeof display, 'function')
})

test('exports a column function', t => {
  t.is(typeof column, 'function')
})

test('exports a flex function', t => {
  t.is(typeof flex, 'function')
})

