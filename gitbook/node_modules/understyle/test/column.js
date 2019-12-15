
import test from 'ava'
import column, { createWidthScale, setColumns } from '../src/column'

const expectedScale = [
  '0%',
  `${1 / 12 * 100}%`,
  `${2 / 12 * 100}%`,
  `${3 / 12 * 100}%`,
  `${4 / 12 * 100}%`,
  `${5 / 12 * 100}%`,
  `${6 / 12 * 100}%`,
  `${7 / 12 * 100}%`,
  `${8 / 12 * 100}%`,
  `${9 / 12 * 100}%`,
  `${10 / 12 * 100}%`,
  `${11 / 12 * 100}%`,
  `${12 / 12 * 100}%`
]

test('is a function', t => {
  t.is(typeof column, 'function')
})

test('createWidthScale creates a width scale', t => {
  const scale = createWidthScale(12)
  scale.forEach((step, i) => {
    t.is(expectedScale[i], step)
  })
})

test('setColumns returns a function', t => {
  t.is(typeof setColumns, 'function')
  t.is(typeof setColumns(), 'function')
})

expectedScale.forEach((step, i) => {
  test(`adds width for col ${i}`, t => {
    const sx = column({ col: i })
    t.deepEqual(sx, {
      width: step
    })
  })
})
