
import test from 'ava'
import ruled from './src'

test('returns a string', t => {
  const bg = ruled()
  t.is(typeof bg, 'string')
})

test('changes grid size', t => {
  const bg = ruled({
    size: 12
  })
  t.regex(bg, /11px/)
  t.regex(bg, /12px/)
})

test('changes stroke width', t => {
  const bg = ruled({
    strokeWidth: 2
  })
  t.regex(bg, /6px/)
})

test('disables horizontal rules', t => {
  const bg = ruled({
    horizontal: false
  })
  t.notRegex(bg, /gradient\(transparent/)
  t.regex(bg, /90deg/)
})

test('disables vertical rules', t => {
  const bg = ruled({
    vertical: false
  })
  t.notRegex(bg, /90deg/)
})

test('changes rule color', t => {
  const bg = ruled({
    color: 'tomato'
  })
  t.notRegex(bg, /rgba/)
  t.regex(bg, /tomato/)
})

