
import test from 'ava'
import prefix from '../src/prefix'

test('is a function', t => {
  t.is(typeof prefix, 'function')
})

test('prefixes flex property', t => {
  const style = prefix({
    flex: '1 1 auto'
  })
  t.deepEqual(style, {
    WebkitFlex: '1 1 auto',
    msFlex: '1 1 auto',
    flex: '1 1 auto'
  })
})

test('prefixes flex-direction column', t => {
  const style = prefix({
    flexDirection: 'column'
  })
  t.deepEqual(style, {
    WebkitFlexDirection: 'column',
    msFlexDirection: 'column',
    flexDirection: 'column'
  })
})

test('prefixes flex-wrap wrap', t => {
  const style = prefix({
    flexWrap: 'wrap'
  })
  t.deepEqual(style, {
    WebkitFlexWrap: 'wrap',
    msFlexWrap: 'wrap',
    flexWrap: 'wrap'
  })
})

test('prefixes align-items flex-start', t => {
  const style = prefix({
    alignItems: 'flex-start'
  })
  t.deepEqual(style, {
    WebkitAlignItems: 'flex-start',
    msAlignItems: 'flex-start',
    alignItems: 'flex-start'
  })
})

test('prefixes justify-content flex-start', t => {
  const style = prefix({
    justifyContent: 'flex-start'
  })
  t.deepEqual(style, {
    WebkitJustifyContent: 'flex-start',
    msJustifyContent: 'flex-start',
    justifyContent: 'flex-start'
  })
})

test('prefixes order 1', t => {
  const style = prefix({
    order: 1
  })
  t.deepEqual(style, {
    WebkitOrder: 1,
    msFlexOrder: 1,
    order: 1
  })
})

