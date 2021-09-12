import '@spa/init'
import test from 'ava'
import run from './run'

test('run', (t) => {
  t.false(run.isDev)
  t.true(run.isProd)

  t.throws(() => {
    run.assert(false)
  })

  t.notThrows(() => {
    run.assert(true)
  })

  t.notThrows(() => {
    run.sysErr(true)
    run.sysErr('sys')
    run.sysErr(-1)
  })

  t.throws(() => {
    run.sysErr(false)
    run.sysErr('')
    run.sysErr(0)
  })
})
