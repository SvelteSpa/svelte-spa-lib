import assert from '@spa/assert'

export type NN = number | Num

const _eps = 0.000001

export const num = (v: any = undefined) => Num.$(v)
export default num

export class Num extends Number {
  constructor(v: any = Num.NaN) {
    super(v.valueOf())
  }

  static $(n: any): Num {
    return n instanceof Num ? n : new this(n)
  }

  isNaN(): boolean {
    return Number.isNaN(this.valueOf())
  }

  isDef(): boolean {
    return !this.isNaN()
  }

  isPos(): boolean {
    return 0 < this.valueOf()
  }

  isNeg(): boolean {
    return 0 > this.valueOf()
  }

  is0(): boolean {
    return 0 === this.valueOf()
  }

  abs(): Num {
    return Num.$(Math.abs(this.valueOf()))
  }

  sig(): Num {
    return Num.$(Math.sign(this.valueOf()))
  }

  isNear(n: NN, eps: NN = _eps): boolean {
    return this.sub(n).abs().valueOf() < eps.valueOf()
  }

  add(n: NN): Num {
    return Num.$(this.valueOf() + n.valueOf())
  }

  sub(n: NN): Num {
    return Num.$(this.valueOf() - n.valueOf())
  }

  mul(n: NN): Num {
    return Num.$(this.valueOf() * n.valueOf())
  }

  div(n: NN): Num {
    return Num.$(this.valueOf() / n.valueOf())
  }

  neg(): Num {
    return Num.$(-this.valueOf())
  }

  idv(n: NN): Num {
    return this.div(n).trunc()
  }

  mod(n: NN): Num {
    return Num.$(this.valueOf() % n.valueOf())
  }

  eq(n: NN): boolean {
    return this.valueOf() === n.valueOf()
  }

  ne(n: NN): boolean {
    return this.valueOf() !== n.valueOf()
  }

  lt(n: NN): boolean {
    return this.valueOf() < n.valueOf()
  }

  le(n: NN): boolean {
    return this.valueOf() <= n.valueOf()
  }

  gt(n: NN): boolean {
    return this.valueOf() > n.valueOf()
  }

  ge(n: NN): boolean {
    return this.valueOf() >= n.valueOf()
  }

  floor(): Num {
    return Num.$(Math.floor(this.valueOf()))
  }

  ceil(): Num {
    return Num.$(Math.ceil(this.valueOf()))
  }

  round(): Num {
    return Num.$(Math.round(this.valueOf()))
  }

  trunc(): Num {
    return Num.$(Math.trunc(this.valueOf()))
  }

  negate(b: boolean): Num {
    return b ? this.neg() : this
  }

  norm(lo: NN, hi: NN): Num {
    const lov = lo.valueOf(),
      hiv = hi.valueOf()
    assert(lov <= hiv)
    let v = this.valueOf()
    if (v < lov || hiv <= v) {
      const rge = hiv - lov
      v -= lov
      v -= Math.floor(v / rge) * rge
      if ((v += lov) >= hiv) v = lov
    }
    return Num.$(v)
  }

  clamp(lo: NN, hi: NN): Num {
    return this.min(hi).max(lo)
  }

  clamp01(): Num {
    return this.clamp(0, 1)
  }

  min(n: NN): Num {
    return Num.$(Math.min(this.valueOf(), n.valueOf()))
  }

  max(n: NN): Num {
    return Num.$(Math.max(this.valueOf(), n.valueOf()))
  }

  inv(): Num {
    return Num.$(this.is0() ? Num.NaN : 1 / this.valueOf())
  }

  sqrt(): Num {
    return Num.$(Math.sqrt(this.valueOf()))
  }

  log2(): Num {
    return Num.$(Math.log(this.valueOf()) * Math.LOG2E)
  }

  exp2(): Num {
    return Num.$(Math.exp(this.valueOf() / Math.LOG2E))
  }

  log10(): Num {
    return Num.$(Math.log(this.valueOf()) * Math.LOG10E)
  }

  exp10(): Num {
    return Num.$(Math.exp(this.valueOf() / Math.LOG10E))
  }

  pow(exp: NN): Num {
    return Num.$(Math.pow(this.valueOf(), exp.valueOf()))
  }

  sin(): Num {
    return Num.$(Math.sin(this.valueOf()))
  }

  cos(): Num {
    return Num.$(Math.cos(this.valueOf()))
  }

  tan(): Num {
    return Num.$(Math.tan(this.valueOf()))
  }

  asin(): Num {
    return Num.$(Math.asin(this.valueOf()))
  }

  acos(): Num {
    return Num.$(Math.acos(this.valueOf()))
  }

  atan(): Num {
    return Num.$(Math.atan(this.valueOf()))
  }

  fromScale(lo: NN, hi: NN): Num {
    const lov = lo.valueOf(),
      hiv = hi.valueOf()
    assert(lov <= hiv)
    return Num.$(lov + this.valueOf() * (hiv - lov))
  }

  intoScale(lo: NN, hi: NN): Num {
    const lov = lo.valueOf(),
      hiv = hi.valueOf()
    assert(lov <= hiv)
    return Num.$((this.valueOf() - lov) / (hiv - lov))
  }

  scale(lo1: NN, hi1: NN, lo2: NN, hi2: NN): Num {
    return this.intoScale(lo1, hi1).fromScale(lo2, hi2)
  }

  static rand(lo: NN, hi: NN) {
    return Num.$(Math.random()).fromScale(lo, hi)
  }
}
