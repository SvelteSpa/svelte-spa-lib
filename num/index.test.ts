import test from 'ava'
import num from './index'

test('num', (t) => {
  t.is(10, num.toInt('10'))
  t.is(10, num.toInt(10.2))
  t.is(2, num.clamp(2, 1, 6))
  t.is(3, num.clamp(2, 3, 6))
  t.is(6, num.clamp(2, 6, 6))
  t.is(6, num.clamp(2, 7, 6))
})
