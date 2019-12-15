
import test from 'ava'
import getNumberProp from '../src/get-number-prop'

test('is a function', t => {
  t.is(typeof getNumberProp, 'function')
})

test('returns partial functions', t => {
  t.plan(2)
  const getScaledProp = getNumberProp([])
  const getMargin = getScaledProp('margin')
  t.is(typeof getScaledProp, 'function')
  t.is(typeof getMargin, 'function')
})

test('returns an object based on scale, property, and value', t => {
  const getMargin = getNumberProp([0, 4, 8])('margin')
  const sx = getMargin(1)
  t.deepEqual(sx, {
    margin: 4
  })
})

test('supports negative numbers', t => {
  const getMargin = getNumberProp([0, 4, 8])('margin')
  const sx = getMargin(-1)
  t.deepEqual(sx, {
    margin: -4
  })
})

