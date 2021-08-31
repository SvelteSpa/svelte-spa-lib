import test from 'ava'
import * as str from './str'

test('split', (t) => {
  t.deepEqual(['a', '🍕', 'c'], str.split('/a/ 🍕//c', '/'))
  t.deepEqual(['a', ' b', '🍕'], str.split('/a/ b//🍕', '/', false))
  t.deepEqual(['', 'a', 'b', '', 'c'], str.split('/a/b//c', '/', true, true))
  t.deepEqual(['', 'a', ''], str.split(' / a / ', '/', true, true))
  t.deepEqual([' ', ' a ', ' '], str.split(' / a / ', '/', false, true))
  t.deepEqual(['a'], str.split(' / a / ', '/', true, false))
  t.deepEqual([' a '], str.split(' / a / ', '/', false, false))
})

test('utf', (t) => {
  t.is('hello', '\u0068ell\u006F')
  t.is(1, 'a'.length)
  t.is(2, '🍕'.length)
  t.is(1, [...'🍕'].length)
})

test('last', (t) => {
  t.is('b', str.last('ab'))
  t.is(undefined, str.last(''))
  t.is('č', str.last('č'))
  t.is('🍕', str.last('č🍕'))
})

test('butLast', (t) => {
  t.is('a', str.butLast('ab'))
  t.is('', str.butLast(' '))
  t.is(undefined, str.butLast(''))
  t.is('č', str.butLast('č🍕'))
  t.is('🍕', str.butLast('🍕č'))
  t.is('🍕', str.butLast('🍕🍕'))
})
