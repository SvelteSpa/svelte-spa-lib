import { XY } from './xy'

export const trf = (tr: XY, sc: XY) => Trf.$(tr, sc)
export default trf

export class Trf {
  tr: XY
  sc: XY

  static _0 = trf(XY._0, XY._0)

  constructor(tr: XY, sc: XY) {
    this.tr = tr
    this.sc = sc
  }

  static $(tr: XY, sc: XY): Trf {
    return new Trf(tr, sc)
  }

  toString(): str {
    return `(${this.tr}/${this.sc})`
  }

  is0(): boolean {
    return this.tr.is0() && this.sc.is0()
  }

  isNear(o: Trf): boolean {
    return this.tr.isNear(o.tr) && this.sc.isNear(o.sc)
  }

  eq(o: Trf): boolean {
    return this.tr.eq(o.tr) && this.sc.eq(o.sc)
  }

  svgString(): str {
    let s = ''
    if (!this.tr.is0()) s += `translate(${this.tr._x} ${this.tr._y}) `
    if (!this.sc.is0()) s += `scale(${this.sc._x} ${this.sc._y})`
    return s.trim()
  }

  add(o: Trf): Trf {
    return trf(this.tr.add(o.tr), this.sc.add(o.sc))
  }
}
