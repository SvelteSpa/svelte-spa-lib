import test from 'ava'
import obj from './obj'

test('obj', (t) => {
  t.is(2, obj.size({ a: 1, b: 2 }))
})

test('each', (t) => {
  {
    let vs = [0]
    obj.each({ 0: 10, 33: 20, 11: 30 }, (v) => {
      vs.push(v)
    })
    t.deepEqual([0, 10, 30, 20], vs)
  }

  {
    let ks = ['']
    obj.each({ 0: 10, 33: 20, 11: 30 }, (_v, k) => {
      ks.push(k)
    })
    t.deepEqual(['', '0', '11', '33'], ks)
  }
})

test('eachOwn', (t) => {
  {
    let vs = [] as any[]

    obj.eachOwn({ 1: 10 }, (v) => {
      vs.push(v)
    })
    t.deepEqual([10], vs)

    obj.eachOwn({ 1: 10 }, (_v, k) => {
      vs.push(k)
    })
    t.deepEqual([10, '1'], vs)
  }
})

test('find', (t) => {
  let o = { a: 1, b: 2, c: 3, d: 4, e: 5 }
  let find = (fun: any) => obj.find(o, fun)

  t.is(
    false,
    find(() => false)
  )
  t.is(
    'a',
    find(() => true)
  )
  t.is(
    false,
    find((v: any) => 123 == v)
  )
  t.is(
    'c',
    find((v: any) => 3 == v)
  )
})

test('size', (t) => {
  t.is(0, obj.size([]))
  t.is(0, obj.size(''))
  t.is(0, obj.size({}))

  t.is(1, obj.size([null]))
  t.is(1, obj.size(' '))
  t.is(1, obj.size({ a: 9 }))
})

test('keys', (t) => {
  t.deepEqual(['2', '3'], obj.keys({ 3: 33, 2: 22 }))
})

test('vals', (t) => {
  t.deepEqual([22, 33], obj.vals({ 3: 33, 2: 22 }))
})

test('uni', (t) => {
  t.deepEqual(
    { 2: 22, 3: 33, a: 'aa' },
    obj.uni({ a: 'aa', 2: 'bb' }, { 3: 33, 2: 22 })
  )
})

test('clear', (t) => {
  let o = { a: 1, b: 2 }
  obj.clear(o)
  t.deepEqual({}, o as {})
})
