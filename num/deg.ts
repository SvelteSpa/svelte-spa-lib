import { Num } from './num'
import type { NN } from './num'
import { Rad } from './rad'

export const deg = (v?: any) => Deg.$(v)
export default deg

export class Deg extends Num {
  static $(n: any = Num.NaN): Deg {
    return n instanceof Deg ? n : new this(n)
  }

  static toRad(n: NN): Rad {
    return Rad.$((n.valueOf() * Math.PI) / 180)
  }

  toRad(): Rad {
    return Deg.toRad(this)
  }

  sin(): Num {
    return this.toRad().sin()
  }

  cos(): Num {
    return this.toRad().cos()
  }

  tan(): Num {
    return this.toRad().tan()
  }

  static asin(n: NN): Deg {
    return Rad.asin(n.valueOf()).toDeg()
  }

  static acos(n: NN): Deg {
    return Rad.acos(n.valueOf()).toDeg()
  }

  static atan(n: NN): Deg {
    return Rad.atan(n.valueOf()).toDeg()
  }
}
