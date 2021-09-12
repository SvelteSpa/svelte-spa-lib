import '@spa/init'
import num from '@spa/num/num'
import test from 'ava'
import ra, { RA } from './ra'
import { xy1, XY } from './xy'

test('XY', (t) => {
  let tt = t.true
  // let ff = t.false
  let eq = (a: any, b: any) => t.deepEqual(a, b)

  tt(ra(0, 0) instanceof RA)
  tt(ra(0, 0).is0())

  {
    const o = ra(2, 45)
    tt(o.r().eq(2) && o.a().eq(45))
    tt(!o.is0())
  }

  eq('[8\\9]', ra(8, 9).toString())

  tt(ra(0, 0).add(ra(0, 0)).is0())
  tt(ra(0, 0).add(ra(1, 2)).eq(ra(1, 2)))
  tt(
    ra(1, 45)
      .add(ra(1, -45))
      .isNear(ra(num(2).sqrt(), 0))
  )

  {
    const xy = ra(1, 45).toXY()
    tt(xy instanceof XY)
    tt(xy.isNear(xy1(num(2).inv().sqrt())))
  }

  tt(RA.fromArray([2, 3]).eq(ra(2, 3)))
})
