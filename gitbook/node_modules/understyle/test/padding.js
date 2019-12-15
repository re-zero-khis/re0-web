
import test from 'ava'
import padding, { setScale } from '../src/padding'
import initialScale from '../src/initial-scale'
import getProp from '../src/get-prop'

test('is a function', t => {
  t.is(typeof padding, 'function')
})

test('initialScale is an array', t => {
  t.plan(2)
  t.true(Array.isArray(initialScale))
  t.is(initialScale.length, 7)
})

test('setScale is a function', t => {
  t.is(typeof setScale, 'function')
})

test('getProp is a function', t => {
  t.is(typeof getProp, 'function')
})

test('returns an object', t => {
  const sx = padding()
  t.is(typeof sx, 'object')
})

initialScale.forEach((step, i) => {
  test(`returns padding ${i}`, t => {
    const sx = padding({ p: i })
    t.deepEqual(sx, {
      padding: step
    })
  })
})

initialScale.forEach((step, i) => {
  test(`adds padding top ${i}`, t => {
    const sx = padding({ pt: i })
    t.deepEqual(sx, {
      paddingTop: step
    })
  })
})

initialScale.forEach((step, i) => {
  test(`adds padding right ${i}`, t => {
    const sx = padding({ pr: i })
    t.deepEqual(sx, {
      paddingRight: step
    })
  })
})

initialScale.forEach((step, i) => {
  test(`adds padding bottom ${i}`, t => {
    const sx = padding({ pb: i })
    t.deepEqual(sx, {
      paddingBottom: step
    })
  })
})

initialScale.forEach((step, i) => {
  test(`adds padding x-axis ${i}`, t => {
    const sx = padding({ px: i })
    t.deepEqual(sx, {
      paddingLeft: step,
      paddingRight: step
    })
  })
})

initialScale.forEach((step, i) => {
  test(`adds padding y-axis ${i}`, t => {
    const sx = padding({ py: i })
    t.deepEqual(sx, {
      paddingTop: step,
      paddingBottom: step
    })
  })
})

test('returns shorthand and full padding properties', t => {
  const sx = padding({ p: 2, pb: 4 })
  t.deepEqual(sx, {
    padding: 16,
    paddingBottom: 48
  })
})

