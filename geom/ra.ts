import { Deg } from '@spa/num/deg'
import { Num } from '@spa/num/num'
import type { NN } from '@spa/num/num'
import { XY, xy } from './xy'

export const ra = (r: NN, a: NN) => RA.$(r, a)
export default ra

export class RA {
  _r: number
  _a: number

  static _0 = ra(0, 0)

  constructor(r: NN, a: NN) {
    let rv = r.valueOf(),
      av = a.valueOf()
    if (rv < 0) {
      rv = -rv
      av += 180
    }

    this._r = rv
    this._a = Num.$(av).norm(0, 360).valueOf()
  }

  static $(r: NN, a: NN): RA {
    return new RA(r, a)
  }

  static $$(o: RA | NN[]): RA {
    if (o instanceof RA) return ra(o._r, o._a)
    return this.fromArray(o)
  }

  static fromArray(a: NN[]): RA {
    return ra(a[0], a[1])
  }

  static fromRA(o: { r: NN; a: NN }): RA {
    return ra(o.r, o.a)
  }

  r(): Num {
    return Num.$(this._r)
  }

  a(): Deg {
    return Deg.$(this._a)
  }

  toString() {
    return `[${this._r}\\${this._a}]`
  }

  is0(): boolean {
    return 0 === this._r
  }

  isNear(o: RA): boolean {
    return this.r().isNear(o._r) && this.a().isNear(o._a)
  }

  add(o: RA): RA {
    return this.toXY().add(o.toXY()).toRA()
  }

  eq(o: RA): boolean {
    return this._r === o._r && this._a === o._a
  }

  toXY(): XY {
    return xy(
      this._r * this.a().cos().valueOf(),
      this._r * this.a().sin().valueOf()
    )
  }
}

// eof
