import O from '@spa/obj'

let $ = {
  toInt: (x: str | num): int =>
    (O(x).isNum() ? Math.round(x as num) : Number.parseInt(x as str)) as int,
  clamp: (min: typeof x, x: any, max: typeof x) =>
    x <= min ? min : max <= x ? max : x,
}

export default $
