import test from 'ava'
import any from './any'

test('cons', (t) => {
  t.is('Array', any.consName([]))
  t.is('Boolean', any.consName(false))
  t.is('Object', any.consName({}))
  t.is('Number', any.consName(0))
  t.is('String', any.consName(''))
})

test('is', (t) => {
  t.true(any.isDef(1))
  t.true(any.isDef(''))
  t.true(any.isDef({}))
  t.true(any.isDef(null))
  t.false(any.isDef(undefined))

  t.true(any.isFin(0))
  t.true(any.isFin(-3.5))
  t.false(any.isFin('10'))
  t.false(any.isFin({}))
  t.false(any.isFin(Number.NEGATIVE_INFINITY))

  t.true(any.isNan(Number.NaN))

  t.false(any.isInt(null))
  t.false(any.isInt('a'))
  t.false(any.isInt(3.5))
  t.true(any.isInt(3.0))

  t.true(any.isFun(() => {}))
  t.true(any.isFun((a) => a == a))

  t.false(any.isArr(null))
  t.false(any.isArr(undefined))
  t.false(any.isArr({}))
  t.false(any.isArr(1))
  t.false(any.isArr('a'))
  t.true(any.isArr([]))
  t.true(any.isArr([1, 2]))

  t.true(any.isBol(false))
  t.true(any.isBol(true))
  t.true(any.isBol(0 == 0))
  t.true(any.isBol(0 != 0))
  t.true(any.isBol(!'a'))
  t.true(any.isBol(new Boolean()))
  t.false(any.isBol('a'))
  t.false(any.isBol(null))
  t.false(any.isBol(undefined))
  t.false(any.isBol({}))
  t.false(any.isBol([]))
  t.false(any.isBol(new Number()))

  t.false(any.isObj(8))
  t.false(any.isObj('a'))
  t.false(any.isObj([]))
  t.false(any.isObj(null))

  t.true(any.isObj({}))
  t.true(any.isObj({ a: 3 }))

  t.false(any.isNum(null))
  t.true(any.isNum(3.4))
  t.true(any.isNum(1 + 2))

  t.false(any.isStr(null))
  t.false(any.isStr(1 + 2))
  t.true(any.isStr(''))
})

test('clone', (t) => {
  t.deepEqual([1, { a: 6 }, 3], any.clone([1, { a: 6 }, 3]))
  t.deepEqual(3, any.clone(3))
  t.deepEqual({}, any.clone({}))
  let a = [1, 2, 3]
  let c = any.clone(a)
  a.push(7)
  t.deepEqual([1, 2, 3], c)
})
