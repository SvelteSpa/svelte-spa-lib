import { Num } from '@spa/num/num'
import test from 'ava'
import { RA } from './ra'
import { XY, xy, xy1 } from './xy'

test('XY', (t) => {
  let tt = t.true
  // let ff = t.false
  let eq = (a: any, b: any) => t.deepEqual(a, b)

  tt(xy(0, 0) instanceof XY)
  tt(xy(0, 0).is0())

  {
    const o = xy(2, 3)
    tt(o.x().eq(2) && o.y().eq(3))
    tt(!o.is0())
  }

  eq('[8:9]', xy(8, 9).toString())

  tt(xy(3, 4).eq(xy1(1).add(xy(2, 3))))
  tt(xy(3, 4).eq(xy(2, 3).add(xy1(1))))

  tt(xy(-1, -2).eq(xy1(1).sub(xy(2, 3))))
  tt(xy(1, 2).eq(xy(2, 3).sub(xy1(1))))

  tt(xy(8, 15).eq(xy(4, 5).mul(xy(2, 3))))
  tt(xy(-8, -10).eq(xy(4, 5).mul(-2)))

  tt(xy(2, 2).eq(xy(4, 6).div(xy(2, 3))))
  tt(xy(-2, -1).eq(xy(4, 2).div(-2)))

  tt(xy(-2, -1).eq(xy(2, 1).neg()))
  tt(xy(2, 3).mag().eq(13))

  tt(xy(3, 4).lgt().eq(5))

  tt(xy(3, 4).dot(xy(2, 3)).eq(18))
  tt(xy(3, 4).cross(xy(2, 3)).eq(1))

  tt(
    xy(1, 1)
      .unit()
      .isNear(xy1(Num.$(2).inv().sqrt()))
  )

  tt(xy(1, 2).min().eq(1))
  tt(xy(1, 2).max().eq(2))

  {
    const ra = xy1(1).toRA()
    tt(ra instanceof RA)
    tt(ra.r().isNear(Num.$(2).sqrt()) && ra.a().isNear(45))
  }

  tt(XY.fromArray([2, 3]).eq(xy(2, 3)))

  {
    const o = { x: 2, y: 3 }
    tt(XY.fromXY(o).eq(xy(2, 3)))
  }

  {
    const o = { width: 2, height: 3 }
    tt(XY.fromWH(o).eq(xy(2, 3)))
  }
})

// eof
