
import test from 'ava'
import margin, { setScale } from '../src/margin'
import initialScale from '../src/initial-scale'
import getProp from '../src/get-prop'

test('is a function', t => {
  t.is(typeof margin, 'function')
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
  const sx = margin()
  t.is(typeof sx, 'object')
})

initialScale.forEach((step, i) => {
  test(`returns margin ${i}`, t => {
    const sx = margin({ m: i })
    t.deepEqual(sx, {
      margin: step
    })
  })
})

initialScale.forEach((step, i) => {
  test(`adds margin top ${i}`, t => {
    const sx = margin({ mt: i })
    t.deepEqual(sx, {
      marginTop: step
    })
  })
})

initialScale.forEach((step, i) => {
  test(`adds margin right ${i}`, t => {
    const sx = margin({ mr: i })
    t.deepEqual(sx, {
      marginRight: step
    })
  })
})

initialScale.forEach((step, i) => {
  test(`adds margin bottom ${i}`, t => {
    const sx = margin({ mb: i })
    t.deepEqual(sx, {
      marginBottom: step
    })
  })
})

initialScale.forEach((step, i) => {
  test(`adds margin x-axis ${i}`, t => {
    const sx = margin({ mx: i })
    t.deepEqual(sx, {
      marginLeft: step,
      marginRight: step
    })
  })
})

initialScale.forEach((step, i) => {
  test(`adds margin y-axis ${i}`, t => {
    const sx = margin({ my: i })
    t.deepEqual(sx, {
      marginTop: step,
      marginBottom: step
    })
  })
})

initialScale.forEach((step, i) => {
  test(`adds gutter ${i} (i.e. negative x-axis margins)`, t => {
    const sx = margin({ gutter: i })
    t.deepEqual(sx, {
      marginLeft: -step,
      marginRight: -step
    })
  })
})

initialScale.forEach((step, i) => {
  test(`adds negative margins ${i}`, t => {
    const sx = margin({ mx: -i })
    t.deepEqual(sx, {
      marginLeft: -step,
      marginRight: -step
    })
  })
})

test('returns margin auto', t => {
  const sx = margin({ mx: 'auto' })
  t.deepEqual(sx, {
    marginLeft: 'auto',
    marginRight: 'auto'
  })
})

test('returns shorthand and full margin properties', t => {
  const sx = margin({ m: 2, mb: 4 })
  t.deepEqual(sx, {
    margin: 16,
    marginBottom: 48
  })
})

