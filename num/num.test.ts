import '@spa/init'
import test from 'ava'
import num, { Num } from './num'

test('Num', (t) => {
  let tt = t.true
  let ff = t.false
  let eq = (a: any, b: Num) => t.deepEqual(num(a), b)

  tt(num() instanceof Num)

  tt(num().isNaN())
  ff(num().isDef())
  ff(num().isPos())
  ff(num().isNeg())
  ff(num().is0())
  tt(num().abs().isNaN())
  tt(num(4).isNear(4.0000005))
  ff(num(4).isNear(4.000002))
  ff(num(-4).isNear(4.0000005))

  eq(4, num(3).add(1))
  eq(-7, num(3).sub(10))
  eq(12, num(-3).mul(-4))
  eq(-3, num(6).div(-2))
  eq(3, num(-6).div(-2))

  eq(3, num(-3).neg())
  eq(-3, num(3).neg())

  eq(1, num(6).idv(4))
  eq(-1, num(6).idv(-4))
  eq(-1, num(-6).idv(4))
  eq(1, num(-6).idv(-4))

  eq(2, num(6).mod(4))
  eq(2, num(6).mod(-4))
  eq(-2, num(-6).mod(4))
  eq(-2, num(-6).mod(-4))

  eq(6, num(6).idv(4).mul(4).add(num(6).mod(4)))
  eq(6, num(6).idv(-4).mul(-4).add(num(6).mod(-4)))
  eq(-6, num(-6).idv(4).mul(4).add(num(-6).mod(4)))
  eq(-6, num(-6).idv(-4).mul(-4).add(num(-6).mod(-4)))

  tt(num(7).eq(7))
  ff(num(7).ne(7))
  ff(num(7).eq(num()))
  tt(num(7).ne(num()))
  tt(num().ne(num()))

  ff(num(7).lt(7))
  tt(num(7).lt(8))
  ff(num(8).lt(7))

  tt(num(7).le(7))
  tt(num(7).le(8))
  ff(num(8).le(7))

  ff(num(7).gt(7))
  ff(num(7).gt(8))
  tt(num(8).gt(7))

  tt(num(7).ge(7))
  ff(num(7).ge(8))
  tt(num(8).ge(7))

  ff(num(8).lt(num()))
  ff(num(8).le(num()))
  ff(num(8).gt(num()))
  ff(num(8).ge(num()))

  ff(num().lt(num(8)))
  ff(num().le(num(8)))
  ff(num().gt(num(8)))
  ff(num().ge(num(8)))

  eq(8, num(8).floor())
  eq(8, num(8.1).floor())
  eq(-8, num(-8).floor())
  eq(-9, num(-8.1).floor())

  eq(8, num(8).ceil())
  eq(9, num(8.1).ceil())
  eq(-8, num(-8).ceil())
  eq(-8, num(-8.1).ceil())

  eq(8, num(8).round())
  eq(8, num(8.1).round())
  eq(-8, num(-8).round())
  eq(-8, num(-8.1).round())

  eq(8, num(8).trunc())
  eq(8, num(8.1).trunc())
  eq(7, num(7.9).trunc())
  eq(-8, num(-8).trunc())
  eq(-8, num(-8.1).trunc())
  eq(-7, num(-7.9).trunc())

  eq(8, num(8).negate(false))
  eq(-8, num(8).negate(true))

  eq(6, num(3).norm(6, 9))
  eq(7, num(4).norm(6, 9))
  eq(8, num(5).norm(6, 9))
  eq(6, num(6).norm(6, 9))
  eq(7, num(7).norm(6, 9))
  eq(8, num(8).norm(6, 9))
  eq(6, num(9).norm(6, 9))
  eq(7, num(10).norm(6, 9))

  eq(6, num(3).clamp(6, 9))
  eq(6, num(6).clamp(6, 9))
  eq(7, num(7).clamp(6, 9))
  eq(8, num(8).clamp(6, 9))
  eq(9, num(9).clamp(6, 9))
  eq(9, num(10).clamp(6, 9))

  eq(0, num(-3).clamp01())
  eq(1, num(6).clamp01())

  eq(3, num(4).min(6).min(3))
  eq(6, num(4).max(6).max(3))

  tt(num(0).inv().isNaN())
  eq(0.25, num(4).inv())

  eq(2, num(4).sqrt())
  tt(num(-4).sqrt().isNaN())

  tt(num(16).log2().isNear(4))
  tt(num(4).exp2().isNear(16))
  tt(num(1000).log10().isNear(3))
  tt(num(3).exp10().isNear(1000))

  eq(8, num(2).pow(3))
  eq(-8, num(-2).pow(3))
  tt(num(2.00000001).pow(3.0000001).isNear(8))
  tt(num(-2).pow(3.1).isNaN())

  eq(13.5, num(1).scale(0, 2, 10, 17))
  eq(2, num(13.5).scale(10, 17, 0, 4))
})
