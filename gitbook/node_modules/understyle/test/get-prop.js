
import test from 'ava'
import getProp from '../src/get-prop'

test('is a function', t => {
  t.is(typeof getProp, 'function')
})

test('returns partial functions', t => {
  t.plan(2)
  const getScaledProp = getProp([])
  const getMargin = getScaledProp('margin')
  t.is(typeof getScaledProp, 'function')
  t.is(typeof getMargin, 'function')
})

test('returns an object based on scale, property, and value', t => {
  const getMargin = getProp([0, 4, 8])('margin')
  const sx = getMargin(1)
  t.deepEqual(sx, {
    margin: 4
  })
})

