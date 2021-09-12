import { Deg } from '@spa/num/deg'
import { Num } from '@spa/num/num'
import type { NN } from '@spa/num/num'
import { RA, ra } from './ra'

export const xy = (x: NN, y: NN) => XY.$(x, y)
export default xy

export const xy1 = (v: NN) => xy(v, v)

export class XY {
  _x: number
  _y: number

  static _0 = xy(0, 0)

  constructor(x: NN, y: NN) {
    this._x = x.valueOf()
    this._y = y.valueOf()
  }

  static $(x: NN, y: NN): XY {
    return new this(x, y)
  }

  static $$(o: XY | NN[]): XY {
    if (o instanceof XY) return xy(o._x, o._y)
    return this.fromArray(o)
  }

  static fromArray(a: NN[]): XY {
    return xy(a[0], a[1])
  }

  static fromXY(o: { x: NN; y: NN }): XY {
    return xy(o.x, o.y)
  }

  static fromWH(o: { width: NN; height: NN }): XY {
    return xy(o.width, o.height)
  }

  x(): Num {
    return Num.$(this._x)
  }

  y(): Num {
    return Num.$(this._y)
  }

  toString() {
    return `[${this._x}:${this._y}]`
  }

  toSvgString() {
    return `${this._x.toFixed(1)} ${this._y.toFixed(1)}`
  }

  toArray() {
    return [this.x(), this.y()]
  }

  is0(): boolean {
    return 0 === this._x && 0 === this._y
  }

  isNear(o: XY): boolean {
    return this.x().isNear(o._x) && this.y().isNear(o._y)
  }

  add(o: XY): XY {
    return xy(this._x + o._x, this._y + o._y)
  }

  sub(o: XY): XY {
    return xy(this._x - o._x, this._y - o._y)
  }

  mul(o: XY | NN): XY {
    if (o instanceof XY) return xy(this._x * o._x, this._y * o._y)
    const ov = o.valueOf()
    return xy(this._x * ov, this._y * ov)
  }

  div(o: XY | NN): XY {
    if (o instanceof XY) return xy(this._x / o._x, this._y / o._y)
    const ov = o.valueOf()
    return xy(this._x / ov, this._y / ov)
  }

  neg(): XY {
    return xy(-this._x, -this._y)
  }

  mag(): Num {
    return Num.$(this._x * this._x + this._y * this._y)
  }

  lgt(): Num {
    return this.mag().sqrt()
  }

  dot(o: XY): Num {
    return Num.$(this._x * o._x + this._y * o._y)
  }

  cross(o: XY): Num {
    return Num.$(this._x * o._y - this._y * o._x)
  }

  unit(): XY {
    const l = this.lgt()
    return l.gt(0) ? this.div(l) : xy(1, 0)
  }

  eq(o: XY): boolean {
    return this._x === o._x && this._y === o._y
  }

  ne(o: XY): boolean {
    return !this.eq(o)
  }

  min(): Num {
    return this.x().min(this._y)
  }

  max(): Num {
    return this.x().max(this._y)
  }

  toRA(): RA {
    const r = this.lgt()
    if (r.le(0)) return ra(0, 0)

    const x = this.x(),
      y = this.y()
    const a = x.isNear(0)
      ? y.isNear(0)
        ? 0
        : y.isPos()
        ? 90
        : 270
      : Deg.atan(y.div(x)).add(x.isPos() ? 0 : 180)

    return ra(r, a)
  }
}
