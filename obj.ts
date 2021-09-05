import any from '@spa/any'
import type { num, str, bool } from '@spa/typs'

let _loop = (
  o: Object,
  fun: (v: any, k: any, o: Object) => any,
  breakOnFalse = false
): { res?: bool; k?: str } => {
  let n = $.size(o)

  let es = Object.entries(o)

  for (let i = 0; i < n; ++i) {
    let [k, v] = es[i]
    let res = fun(v, k, o)
    if (any.isBol(res) && (breakOnFalse ? !res : res)) return { res, k }
  }

  return {}
}

let each = (o: Object, fun: (v: any, k: any, o: Object) => any): Object => {
  _loop(o, fun)
  return o
}

let eachOwn = (o: {}, fun: (v: any, k: any, o: {}) => any): {} => {
  _loop(Object.keys(o), (k) => fun((o as any)[k], k, o))
  return o
}

// returns false or index or key
let find = (
  o: Object,
  fun: (v: any, k: any, o: Object) => any = (_) => _
): any => {
  let res = _loop(o, fun)
  return res.res ? res.k : false
}

let clear = (o: {}): void => {
  _loop(Object.keys(o), (k) => {
    delete o[k]
  })
}

let $ = {
  each,
  eachOwn,
  find,
  size: (o: {}): num => Object.keys(o).length,
  keys: (o: {}): any[] => Object.keys(o),
  vals: (o: {}): any[] => Object.values(o),
  uni: (...os: {}[]): {} => {
    let res = {}
    for (let o of os) Object.assign(res, o)
    return res
  },
  clear,
}

export default $
