import any from '@spa/any'
import type { int, str, num } from '@spa/typs'

let $ = {
  toInt: (x: str | num): int =>
    (any.isNum(x) ? Math.round(x as num) : Number.parseInt(x as str)) as int,
  clamp: (min: typeof x, x: any, max: typeof x) =>
    x <= min ? min : max <= x ? max : x,
}

export default $
