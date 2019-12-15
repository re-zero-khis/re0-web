
import test from 'ava'
import _style, { createUnderstyle } from '../src'

test('returns a style object', t => {
  const sx = _style()
  t.is(typeof sx, 'object')
})

test('combines style props', t => {
  const sx = _style({
    m: 0,
    mb: 4,
    p: 2,
    col: 6,
    inlineBlock: true,
    flexNone: true
  })
  t.deepEqual(sx, {
    boxSizing: 'border-box',
    margin: 0,
    marginBottom: 48,
    padding: 16,
    width: '50%',
    display: 'inline-block',
    WebkitFlex: 'none',
    msFlex: 'none',
    flex: 'none'
  })
})

test('createUnderstyle returns a function', t => {
  const customUnderstyle = createUnderstyle()
  t.is(typeof customUnderstyle, 'function')
})

test('createUnderstyle sets custom scale and column count', t => {
  const __style = createUnderstyle({
    scale: [0, 6, 12, 18, 24, 30, 36],
    columns: 16
  })
  const sx = __style({
    m: 1,
    p: 2,
    col: 4
  })
  t.deepEqual(sx, {
    boxSizing: 'border-box',
    margin: 6,
    padding: 12,
    width: '25%'
  })
})

test('returns unprefixed styles when option is false', t => {
  const __style = createUnderstyle({
    prefixed: false
  })
  const sx = __style({
    flex: true,
    flexAuto: true
  })
  t.deepEqual(sx, {
    boxSizing: 'border-box',
    display: 'flex',
    flex: '1 1 auto'
  })
})

