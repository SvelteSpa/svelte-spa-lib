import '@spa/init'
import test from 'ava'
import deg, { Deg } from './deg'
import num from './num'

test('Deg', (t) => {
  let tt = t.true
  // let ff = t.false
  let eq = (a: any, b: Deg) => t.deepEqual(deg(a), b)

  tt(deg() instanceof Deg)

  tt(deg(0).toRad().eq(0))
  tt(
    deg(-90)
      .toRad()
      .isNear(-Math.PI / 2)
  )
  tt(
    deg(90)
      .toRad()
      .isNear(Math.PI / 2)
  )
  tt(
    deg(180)
      .toRad()
      .isNear((Math.PI * 2) / 2)
  )
  tt(
    deg(270)
      .toRad()
      .isNear((Math.PI * 3) / 2)
  )
  tt(
    deg(360)
      .toRad()
      .isNear((Math.PI * 4) / 2)
  )

  eq(45, Deg.acos(Math.sqrt(2) / 2))
  t.deepEqual(num(Math.sqrt(2) / 2), deg(45).cos())

  eq(90, Deg.asin(1))
  t.deepEqual(num(1), deg(90).sin())
})
