import O from '@spa/obj'

type Self = any // chaining
type Ind = int
type FindFun<T> = (v: T, i: Ind, a: T[]) => bool
type WhileFun<T> = (v: T, i: Ind, a: T[]) => bool
type EachFun<T> = (v: T, i: Ind, a: T[]) => any

declare global {
  interface ArrayConstructor {
    iota(n: int, mapFun: (i: int) => any): any[]
  }

  interface Array<T> {
    sz(): int
    find(fun: FindFun<T>): Ind | false
    while(fun: WhileFun<T>): Self
    each(fun: EachFun<T>): Self
    last(): T | undefined
    padded(lgt: int, v: T): T[]
  }
}

Array.iota = function (n: int, mapFun?: (i: int) => any) {
  return Array.from({ length: n }, (_v, i) => (mapFun ? mapFun(i as int) : i))
}

let $$ = Array.prototype

$$.sz = function (): int {
  return this.length
}

$$.find = function <T>(
  fun: (v: T, i: Ind, a: T[]) => bool | false
): Ind | false {
  let n = this.length

  for (let i = 0; i < n; ++i) {
    if (fun(this[i], i as int, this)) return i as int
  }

  return false
}

$$.while = function <T>(fun: (v: T, i: Ind, a: T[]) => bool): Self {
  let n = this.length

  for (let i = 0; i < n; ++i) {
    if (false === fun(this[i], i as int, this)) break
  }

  return this
}

$$.each = function <T>(fun: (v: T, i: Ind, a: T[]) => bool): Self {
  this.forEach(fun)
  return this
}

$$.last = function <T>(): T | undefined {
  let i = this.length - 1
  return i < 0 ? undefined : this[i]
}

$$.padded = function <T>(lgt: int, v: T): T[] {
  let a = O.clone(this).slice(0, lgt)
  while (a.length < lgt) a.push(v)
  return a
}
