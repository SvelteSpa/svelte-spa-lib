// array manipulation
import any from '@spa/any'
import type { int, bool } from '@spa/typs'

function _loop(
  a: any[],
  fun: (v: any, k: int, x: any[]) => any,
  breakOnFalse = false
): { res?: bool; k?: int } {
  let n = a.length

  for (let i = 0; i < n; ++i) {
    let res = fun((a as any[])[i], i as int, a)
    if (any.isBol(res) && (breakOnFalse ? !res : res))
      return { res, k: i as int }
  }

  return {}
}

let arr = (n: int, mapFun: (i: int) => any) =>
  Array.from({ length: n }, (_v, i) => mapFun(i as int))

function each(a: any[], fun: (v: any, k: int, _: typeof a) => any): typeof a {
  _loop(a, fun)
  return a
}

// returns false or index or key
function find(
  a: any[],
  fun: (v: any, k: any, _: typeof a) => any = (_) => _
): any | false {
  let res = _loop(a, fun)
  return res.res ? res.k : false
}

export let pad = (x: any[], l: int, v: any): typeof x => {
  x = any.clone(x).slice(0, l)
  while (x.length < l) x.push(v)
  return x
}

let $ = {
  asArr: (x: any): any[] => (any.isArr(x) ? x : [x]),
  arr, // generate array
  each, // for each do
  find,
  last: (x: any[]) => {
    let pos = x.length - 1
    if (pos < 0) return undefined
    return x[pos]
  },
  pad,
}

export default $
