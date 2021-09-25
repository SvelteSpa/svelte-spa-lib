import O from '@spa/obj'

type Self = any // chaining
type Ind = int
type FindFun<T> = (v: T, i: Ind, a: T[]) => bool
type WhileFun<T> = (v: T, i: Ind, a: T[]) => bool
type EachFun<T> = (v: T, i: Ind, a: T[]) => any
type MapFun<T> = (v: T, i: Ind, a: T[]) => T|null
type FilterFun<T> = (v: T, i: Ind, a: T[]) => bool

declare global {
  interface Array<T> {
    get sz(): int
    set sz(int)
    find(fun: FindFun<T>): Ind | false
    findStr(val: str, caseSensitive?: bool): Ind | false
    while(fun: WhileFun<T>): Self
    each(fun: EachFun<T>): Self
    mapFilter(mapFun: MapFun<T>, filterFun?: FilterFun<T>): T[]
    last(): T | undefined
    padded(lgt: int, v: T): T[]
  }
}

let $$ = Array.prototype

Object.defineProperty($$, 'sz', {
  get: function sz() {
    return this.length
  },
  set: function sz(i:int) {
    this.length=i
  },
})

$$.find = function <T>(fun: (v: T, i: Ind, a: T[]) => bool): Ind | false {
  let n = this.sz

  for (let i = 0; i < n; ++i) {
    if (fun(this[i], i as int, this)) return i as int
  }

  return false
}

$$.findStr = function (val: str, cs = false): Ind | false {
  if (!cs) val = val.lc()
  return this.find((v: any) => O(v).isStr() && (cs ? v : v.lc()) == val)
}

$$.while = function <T>(fun: (v: T, i: Ind, a: T[]) => bool): Self {
  let n = this.sz

  for (let i = 0; i < n; ++i) {
    if (false === fun(this[i], i as int, this)) break
  }

  return this
}

$$.each = function <T>(fun: (v: T, i: Ind, a: T[]) => bool): Self {
  this.forEach(fun)
  return this
}

$$.mapFilter = function <T>(mapFun: MapFun<T>, filterFun: FilterFun<T>=(_) => !!_): T[]
{
  return this.map(mapFun).filter(filterFun)
}

$$.last = function <T>(): T | undefined {
  let i = this.sz - 1
  return i < 0 ? undefined : this[i]
}

$$.padded = function <T>(lgt: int, v: T): T[] {
  let a = O.clone(this).slice(0, lgt)
  while (a.sz < lgt) a.push(v)
  return a
}
