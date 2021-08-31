import test from 'ava'
import rad, { Rad } from './rad'
import num from './num'

test('Rad', (t) => {
  let tt = t.true
  // let ff = t.false
  let eq = (a: any, b: Rad) => t.deepEqual(rad(a), b)

  tt(rad() instanceof Rad)

  tt(rad(0).toDeg().eq(0))
  tt(
    rad(-Math.PI / 2)
      .toDeg()
      .isNear(-90)
  )
  tt(
    rad(Math.PI / 2)
      .toDeg()
      .isNear(90)
  )
  tt(
    rad((Math.PI * 2) / 2)
      .toDeg()
      .isNear(180)
  )
  tt(
    rad((Math.PI * 3) / 2)
      .toDeg()
      .isNear(270)
  )
  tt(
    rad((Math.PI * 4) / 2)
      .toDeg()
      .isNear(360)
  )

  eq(Math.PI / 4, Rad.acos(Math.sqrt(2) / 2))
  t.deepEqual(num(Math.sqrt(2) / 2), rad(Math.PI / 4).cos())

  eq(Math.PI / 2, Rad.asin(1))
  t.deepEqual(num(1), rad(Math.PI / 2).sin())
})

// eof
