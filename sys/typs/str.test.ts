import '@spa/init'
import test from 'ava'
import './str'

test('split', (t) => {
  t.deepEqual(['a', '🍕', 'c'], '/a/ 🍕//c'.xsplit('/'))
  t.deepEqual(['a', ' b', '🍕'], '/a/ b//🍕'.xsplit('/', false))
  t.deepEqual(['', 'a', 'b', '', 'c'], '/a/b//c'.xsplit('/', true, true))
  t.deepEqual(['', 'a', ''], ' / a / '.xsplit('/', true, true))
  t.deepEqual([' ', ' a ', ' '], ' / a / '.xsplit('/', false, true))
  t.deepEqual(['a'], ' / a / '.xsplit('/', true, false))
  t.deepEqual([' a '], ' / a / '.xsplit('/', false, false))
  t.deepEqual(['a', 'b', 'c'], 'a\nb\nc'.xsplit())
})

test('utf', (t) => {
  t.is('hello', '\u0068ell\u006F')
  t.is(1, 'a'.length)
  t.is(2, '🍕'.length)
  t.is(1, [...'🍕'].length)
})

test('last', (t) => {
  t.is('b', 'ab'.last())
  t.is(undefined, ''.last())
  t.is('č', 'č'.last())
  t.is('🍕', 'č🍕'.last())
})

test('butLast', (t) => {
  t.is('a', 'ab'.butLast())
  t.is('', ' '.butLast())
  t.is(undefined, ''.butLast())
  t.is('č', 'č🍕'.butLast())
  t.is('🍕', '🍕č'.butLast())
  t.is('🍕', '🍕🍕'.butLast())
})
