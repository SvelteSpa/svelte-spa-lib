import { Deg } from './deg'
import { Num } from './num'
import type { NN } from './num'

export const rad = (v: any = undefined) => Rad.$(v)
export default rad

export class Rad extends Num {
  static $(n: NN): Rad {
    return n instanceof Rad ? n : new this(n)
  }

  static toDeg(n: NN): Deg {
    return Deg.$((n.valueOf() / Math.PI) * 180)
  }

  toDeg(): Deg {
    return Rad.toDeg(this)
  }

  static asin(n: NN): Rad {
    return Rad.$(Math.asin(n.valueOf()))
  }

  static acos(n: NN): Rad {
    return Rad.$(Math.acos(n.valueOf()))
  }

  static atan(n: NN): Rad {
    return Rad.$(Math.atan(n.valueOf()))
  }
}
