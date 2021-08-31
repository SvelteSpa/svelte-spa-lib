import type { int } from '@spa/typs'
import test from 'ava'
import arr from './arr'

test('asArr', (t) => {
  ;[[], [34], [{}]].forEach((a) => t.is(a, arr.asArr(a)))
  ;[null, 34, {}].forEach((x) => t.deepEqual([x], arr.asArr(x)))
})

test('arr', (t) => {
  t.deepEqual(
    [0, 1, 2, 3],
    arr.arr(4 as int, (i) => i)
  )

  t.deepEqual(
    ['0', 1, '2', 3],
    arr.arr(4 as int, (i) => (i % 2 ? i : i + ''))
  )
})

test('each', (t) => {
  {
    let vs = [0]
    arr.each([1, 2, 3], (v) => {
      vs.push(v)
    })
    t.deepEqual([0, 1, 2, 3], vs)
  }

  {
    let ks = [0]
    arr.each([1, 2, 3], (_v, k) => {
      ks.push(k)
    })
    t.deepEqual([0, 0, 1, 2], ks)
  }
})

test('find', (t) => {
  let a = [1, 2, 3, 4, 5]
  let find = (fun: any) => arr.find(a, fun)

  t.is(
    false,
    find(() => false)
  )
  t.is(
    0,
    find(() => true)
  )
  t.is(
    false,
    find((v: any) => 123 == v)
  )
  t.is(
    2,
    find((v: any) => 3 == v)
  )
})

test('last', (t) => {
  t.is(3, arr.last([1, 2, 3]))
  t.is(undefined, arr.last([]))
})

test('pad', (t) => {
  t.deepEqual([1, 2, 3], arr.pad([1, 2, 3], 3 as int, 0))
  t.deepEqual([1, 2, 3], arr.pad([1, 2, 3, 4], 3 as int, 0))
  t.deepEqual([1, 2, 0], arr.pad([1, 2], 3 as int, 0))
})
