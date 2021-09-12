import '@spa/init'
import test from 'ava'
import './obj'

test('obj', (t) => {
  t.is(2, { a: 1, b: 2 }.sz())
})

test('each', (t) => {
  {
    let vs = [0],
      o = { 0: 10, 33: 20, 11: 30 }
    o.each((v) => {
      vs.push(v)
    })
    t.deepEqual([0, 10, 30, 20], vs)
  }

  {
    let ks = [''],
      o = { 0: 10, 33: 20, 11: 30 }
    o.each((_v, k) => {
      ks.push(k)
    })
    t.deepEqual(['', '0', '11', '33'], ks)
  }
})

test('find', (t) => {
  let o = { a: 1, b: 2, c: 3, d: 4, e: 5 }
  let find = (fun: any) => o.find(fun)

  t.true(false === find(() => false))
  t.true('a' == find(() => true))
  t.true(false === find((v: any) => 123 == v))
  t.true('c' == find((v: any) => 3 == v))
})

test('sz', (t) => {
  t.is(0, [].sz())
  t.is(0, ''.sz())
  t.is(0, {}.sz())

  t.is(1, [null].sz())
  t.is(1, ' '.sz())
  t.is(1, { a: 9 }.sz())
})

test('keys', (t) => {
  t.deepEqual(['2', '3'], { 3: 33, 2: 22 }.keys())
})

test('vals', (t) => {
  t.deepEqual([22, 33], { 3: 33, 2: 22 }.vals())
})

test('uni', (t) => {
  t.deepEqual(
    { 2: 22, 3: 33, a: 'aa' },
    { a: 'aa', 2: 'bb' }.union({ 3: 33, 2: 22 })
  )
})

test('clear', (t) => {
  let o = { a: 1, b: 2 }
  o.clear()
  t.deepEqual({}, o as {})
})

let consName = (x: any) => (null == x ? '' : x.constructor.name)

test('cons', (t) => {
  t.is('Array', consName([]))
  t.is('Boolean', consName(false))
  t.is('Object', consName({}))
  t.is('Number', consName(0))
  t.is('String', consName(''))
  t.is(
    'Function',
    consName(() => 0)
  )
})

test('clone', (t) => {
  t.deepEqual([1, { a: 6 }, 3], [1, { a: 6 }, 3].clone() as any)
  t.deepEqual(3, (3).clone())
  t.deepEqual({}, {}.clone())
  let a = [1, 2, 3]
  let c = a.clone()
  a.push(7)
  t.deepEqual([1, 2, 3], c)
})

test('is', (t) => {
  t.false({}.isArr())
  t.false((1).isArr())
  t.false('a'.isArr())
  t.true([].isArr())
  t.true([1, 2].isArr())

  t.true(false.isBol())
  t.true(true.isBol())
  t.true((0 == 0).isBol())
  t.true((0 != 0).isBol())
  t.true((!'a').isBol())
  t.true(new Boolean().isBol())
  t.false('a'.isBol())
  t.false({}.isBol())
  t.false([].isBol())
  t.false(new Number().isBol())

  t.true((3.4).isNum())
  t.true((1 + 2).isNum())
  t.false(true.isNum())

  t.false('a'.isInt())
  t.false((3.5).isInt())
  t.true((3.0).isInt())

  t.false((3.4).isInt())
  t.true((1 + 2).isInt())

  t.false((1 + 2).isStr())
  t.true(''.isStr())

  t.false(''.isFun())
  t.true((() => {}).isFun())
  t.true(((a: any) => a == a).isFun())
})

test('as', (t) => {
  ;[[], [34], [{}]].forEach((a) => t.is(a, a.asArr()))
  ;[false, 34, {}].forEach((x) => t.deepEqual([x], x.asArr()))
})
