import '@spa/init'
import test from 'ava'
import O from './obj'

test('obj', (t) => {
  t.is(2, O({ a: 1, b: 2 }).sz())
})

test('each', (t) => {
  {
    let vs = [0]
    O({ 0: 10, 33: 20, 11: 30 }).each((v) => {
      vs.push(v)
    })
    t.deepEqual([0, 10, 30, 20], vs)
  }

  {
    let ks = ['']
    O({ 0: 10, 33: 20, 11: 30 }).each((_v, k) => {
      ks.push(k)
    })
    t.deepEqual(['', '0', '11', '33'], ks)
  }
})

test('find', (t) => {
  let find = (fun: any) => O({ a: 1, b: 2, c: 3, d: 4, e: 5 }).find(fun)

  t.true(false === find(() => false))
  t.true('a' == find(() => true))
  t.true(false === find((v: any) => 123 == v))
  t.true('c' == find((v: any) => 3 == v))
})

test('sz', (t) => {
  t.is(0, [].sz())
  t.is(0, ''.sz())
  t.is(0, O({}).sz())

  t.is(1, [null].sz())
  t.is(1, ' '.sz())
  t.is(1, O({ a: 9 }).sz())
})

test('keys', (t) => {
  t.deepEqual(['2', '3'], O({ 3: 33, 2: 22 }).keys())
})

test('vals', (t) => {
  t.deepEqual([22, 33], O({ 3: 33, 2: 22 }).vals())
})

test('uni', (t) => {
  t.deepEqual(
    { 2: 22, 3: 33, a: 'aa' },
    O.union({ a: 'aa', 2: 'bb' }, { 3: 33, 2: 22 })
  )
})

test('clear', (t) => {
  let o = { a: 1, b: 2 }
  O.clear(o)
  t.deepEqual({}, o as {})
})

test('cons', (t) => {
  t.is('Array', O([]).consName())
  t.is('Boolean', O(false).consName())
  t.is('Object', O({}).consName())
  t.is('Number', O(0).consName())
  t.is('String', O('').consName())
  t.is('Function', O(() => 0).consName())
})

test('clone', (t) => {
  t.deepEqual([1, { a: 6 }, 3], O.clone([1, { a: 6 }, 3]))
  t.deepEqual(3, O.clone(3))
  t.deepEqual({}, O.clone({}))
  let a = [1, 2, 3]
  let c = O.clone(a)
  a.push(7)
  t.deepEqual([1, 2, 3], c)
})

test('is', (t) => {
  t.false(O({}).isArr())
  t.false(O(1).isArr())
  t.false(O('a').isArr())
  t.true(O([]).isArr())
  t.true(O([1, 2]).isArr())

  t.true(O(false).isBol())
  t.true(O(true).isBol())
  t.true(O(0 == 0).isBol())
  t.true(O(0 != 0).isBol())
  t.true(O(!'a').isBol())
  t.true(O(new Boolean()).isBol())
  t.false(O('a').isBol())
  t.false(O({}).isBol())
  t.false(O([]).isBol())
  t.false(O(new Number()).isBol())

  t.true(O(3.4).isNum())
  t.true(O(1 + 2).isNum())
  t.false(O(true).isNum())

  t.false(O('a').isInt())
  t.false(O(3.5).isInt())
  t.true(O(3.0).isInt())

  t.false(O(3.4).isInt())
  t.true(O(1 + 2).isInt())

  t.false(O(1 + 2).isStr())
  t.true(O('').isStr())

  t.false(O('').isFun())
  t.true(O(() => {}).isFun())
  t.true(O((a: any) => a == a).isFun())
})

test('as', (t) => {
  ;[[], [34], [{}]].forEach((a) => t.is(a, O(a).asArr()))
  ;[false, 34, {}].forEach((x) => t.deepEqual([x], O(x).asArr()))
})
