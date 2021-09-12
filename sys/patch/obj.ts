export {}

type Self = any // chaining
type Key = str
type Val = any
type FindFun = (v: Val, k: Key, o: {}) => bool
type EachFun = (v: Val, k: Key, o: {}) => bool | void

declare global {
  interface Object {
    clear(): void
    sz(): int
    keys(): Key[]
    vals(): Val[]
    find(fun: FindFun): Key | false
    each(fun: EachFun): Self
    union(...os: any[]): {}
    clone(): any

    isArr(): bool
    isBol(): bool
    isNum(): bool
    isInt(): bool
    isStr(): bool
    isFun(): bool

    asArr(): any[]

    // type coercion (where in Svelte 'as ...' is not allowed)
    asAny(): any
    asFun(): FnVoid
  }
}

let $$ = Object.prototype

$$.clear = function (): void {
  this.keys().forEach((key: Key) => delete this[key])
}

$$.sz = function (): int {
  return this.keys().length
}

$$.keys = function (): Key[] {
  return Object.keys(this)
}

$$.vals = function (): Val[] {
  return Object.values(this)
}

$$.find = function (fun): Key | false {
  let es = Object.entries(this)
  let n = es.length

  for (let i = 0; i < n; ++i) {
    let [k, v] = es[i]
    if (fun(v, k, this)) return k
  }

  return false
}

$$.each = function (fun): Self {
  let es = Object.entries(this)
  let n = es.length

  for (let i = 0; i < n; ++i) {
    let [k, v] = es[i]
    if (false === fun(v, k, this)) break
  }

  return this
}

$$.union = function (...os: any[]): {} {
  let res = {}
  Object.assign(res, this)
  for (let o of os) Object.assign(res, o)
  return res
}

$$.clone = function (): any {
  return JSON.parse(JSON.stringify(this))
}

let consName = (x: any) => (null == x ? '' : x.constructor.name)

$$.isArr = function () {
  return Array.isArray(this) // 'Array' === consName(this)
}

$$.isBol = function () {
  return 'Boolean' === consName(this)
}

$$.isNum = function () {
  return 'Number' === consName(this)
}

$$.isInt = function () {
  return 'Number' === consName(this) && Number.isInteger(this)
}

$$.isStr = function () {
  return 'String' === consName(this)
}

$$.isFun = function () {
  return 'Function' === consName(this)
}

$$.asArr = function () {
  return this.isArr() ? this : [this]
}

$$.asAny = function () {
  return this as any
}

$$.asFun = function () {
  return this as FnVoid
}
