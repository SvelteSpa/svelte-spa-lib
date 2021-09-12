import '@spa/init'
import test from 'ava'
import './arr'

test('iota', (t) => {
  t.deepEqual(
    [0, 1, 2, 3],
    Array.iota(4 as int, (i) => i)
  )

  t.deepEqual(
    ['0', 1, '2', 3],
    Array.iota(4 as int, (i) => (i % 2 ? i : i + ''))
  )
})

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

test('find', (t) => {
  let a = [1, 2, 3, 4, 5]
  let find = (fun: any) => a.find(fun)

  t.true(false === find(() => false))
  t.true(0 === find(() => true))
  t.true(false === find((v: any) => 123 == v))
  t.true(2 === find((v: any) => 3 == v))
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
