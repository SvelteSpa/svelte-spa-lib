import test from 'ava'
import any from './any'
import fun from './fun'

test('fun', (t) => {
  t.true(any.isUdf(fun.nul()))
})
