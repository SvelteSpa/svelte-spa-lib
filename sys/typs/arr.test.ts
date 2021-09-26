import '@spa/init'
import test from 'ava'
import './arr'

test('each', (t) => {
  {
    let vs = [0]
    ;[1, 2, 3].each((v) => {
      vs.push(v)
    })
    t.deepEqual([0, 1, 2, 3], vs)
  }

  {
    let ks = [0]
    ;[1, 2, 3].each((_v, k) => {
      ks.push(k)
    })
    t.deepEqual([0, 0, 1, 2], ks)
  }
})

test('sz', (t) => {
  let a = [3, 2, 1]
  t.is(3, [3, 2, 1].sz)
  t.is(3, a.sz)
  t.is(0, [].sz)
  a.sz = 0 as int
  t.is(0, a.sz)
})

test('find', (t) => {
  let a = [1, 2, 3, 4, 5]
  let find = (fun: any) => a.find(fun)

  t.true(false === find(() => false))
  t.true(0 === find(() => true))
  t.true(false === find((v: any) => 123 == v))
  t.true(2 === find((v: any) => 3 == v))
})

test('findVal', (t) => {
  let a = [1, 2, 3, 4, 5]
  let find = (val: any) => a.findVal(val)

  t.true(false === find(-1))
  t.true(0 === find(1))
  t.true(2 === find(3))
})

test('findStr', (t) => {
  t.true(false === [].findStr('1'))
  t.true(false === [1].findStr('1'))
  t.true(0 === ['1'].findStr('1'))

  t.true(1 === [1, 'a', 2].findStr('a'))
  t.true(1 === [1, 'a', 2].findStr('A'))
  t.true(1 === [1, 'a', 2].findStr('a', true))
  t.true(false === [1, 'a', 2].findStr('A', true))

  t.true(0 === ['A', 'a', 'a'].findStr('a', false))
  t.true(1 === ['A', 'a', 'a'].findStr('a', true))
})

test('mapFilter', (t) => {
  t.deepEqual(
    ['a'],
    ['a', 'b', 'c'].mapFilter((_) => ('a' == _ ? _ : null))
  )
})

test('last', (t) => {
  t.is(3, [1, 2, 3].last())
  t.is(undefined, [].last())
})

test('pad', (t) => {
  t.deepEqual([1, 2, 3], [1, 2, 3].padded(3 as int, 0))
  t.deepEqual([1, 2, 3], [1, 2, 3, 4].padded(3 as int, 0))
  t.deepEqual([1, 2, 0], [1, 2].padded(3 as int, 0))
})
