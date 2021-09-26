import '@spa/init'
import test from 'ava'
import './str'

test('null', (t) => {
  t.true(null == null)
  t.true(null == undefined)
  t.true(undefined == undefined)

  t.true(null === null)
  t.true(null !== undefined)
  t.true(undefined === undefined)

  let un: any
  t.true(null == un)
  t.true(undefined == un)
  t.true(null !== un)
  t.true(undefined === un)
})
