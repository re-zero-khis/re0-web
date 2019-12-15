
import test from 'ava'
import display from '../src/display'

test('is a function', t => {
  t.is(typeof display, 'function')
})

test('returns an object', t => {
  const sx = display()
  t.is(typeof sx, 'object')
})

test('returns display block', t => {
  const sx = display({ block: true })
  t.deepEqual(sx, { display: 'block' })
})

test('returns display inline-block', t => {
  const sx = display({ inlineBlock: true })
  t.deepEqual(sx, { display: 'inline-block' })
})

test('returns display inline', t => {
  const sx = display({ inline: true })
  t.deepEqual(sx, { display: 'inline' })
})

test('returns display table', t => {
  const sx = display({ table: true })
  t.deepEqual(sx, { display: 'table' })
})

test('returns display table-row', t => {
  const sx = display({ tableRow: true })
  t.deepEqual(sx, { display: 'table-row' })
})

test('returns display table-cell', t => {
  const sx = display({ tableCell: true })
  t.deepEqual(sx, { display: 'table-cell' })
})

test('returns display flex', t => {
  const sx = display({ flex: true })
  t.deepEqual(sx, {
    display: 'flex'
  })
})

test('returns display inline-flex', t => {
  const sx = display({ inlineFlex: true })
  t.deepEqual(sx, {
    display: 'inline-flex'
  })
})

