import '@spa/init'
import test from 'ava'
import trf, { Trf } from './trf'
import xy, { XY } from './xy'

test('Trf', (t) => {
  let tt = t.true
  let eq = (a: any, b: any) => t.deepEqual(a, b)

  {
    let o = trf(xy(1, 2), xy(3, 4))
    tt(o instanceof Trf)
    tt(o.tr instanceof XY)
    tt(o.sc instanceof XY)

    tt(xy(1, 2).eq(o.tr))
    tt(xy(3, 4).eq(o.sc))
    tt(!o.is0())
  }

  {
    let o = Trf._0
    tt(o instanceof Trf)
    tt(o.tr instanceof XY)
    tt(o.sc instanceof XY)

    tt(o.tr.is0())
    tt(o.sc.is0())
    tt(o.is0())
  }

  tt(trf(xy(1, 2), xy(3, 4)).isNear(trf(xy(1, 2), xy(3, 4))))

  eq('([1:2]/[3:4])', trf(xy(1, 2), xy(3, 4)).toString())

  eq('translate(1 2) scale(3 4)', trf(xy(1, 2), xy(3, 4)).svgString())
  eq('', Trf._0.svgString())

  tt(
    trf(xy(10, 20), xy(30, 40)).eq(
      trf(xy(1, 2), xy(3, 4)).add(trf(xy(9, 18), xy(27, 36)))
    )
  )
})
