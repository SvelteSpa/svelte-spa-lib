// Concise access to Obj
interface ObjO {
  <T>(o: T): Obj<T>
  clear: (o: any) => void
  clone: <T>(o: T) => T
  union: (...os: any[]) => {}
  asAny: (o: any) => any
}

let O = Object.assign(<T>(o: T) => new Obj(o), {
  clear: (o: any) => Obj.clear(o),
  clone: (o: any) => Obj.clone(o),
  union: (...os: any[]) => Obj.union(...os),
  asAny: (o: any): any => o,
}) as ObjO

export default O

type Self<T> = Obj<T>
type Key = str
type Val = any
type FindFun = (v: Val, k: Key, o: {}) => bool
type WhileFun = (v: Val, k: Key, o: {}) => bool
type EachFun = (v: Val, k: Key, o: {}) => any

class Obj<T> {
  constructor(public o: any) {}

  static clear(o: any): void {
    Object.keys(o).forEach((key: Key) => delete o[key])
  }

  sz(): int {
    return this.keys().length as int
  }

  keys(): Key[] {
    return Object.keys(this.o)
  }

  vals(): Val[] {
    return Object.values(this.o)
  }

  find(fun: FindFun): Key | false {
    let es = Object.entries(this.o)
    let n = es.length

    for (let i = 0; i < n; ++i) {
      let [k, v] = es[i]
      if (fun(v, k, this.o)) return k
    }

    return false
  }

  while(fun: WhileFun, withBreak = true): Self<T> {
    let es = Object.entries(this.o)
    let n = es.length

    for (let i = 0; i < n; ++i) {
      let [k, v] = es[i]
      if (false === fun(v, k, this.o) && withBreak) break
    }

    return this
  }

  each(fun: EachFun): Self<T> {
    return this.while(fun, false)
  }

  static union(...os: any[]): {} {
    let res = {}
    for (let o of os) Object.assign(res, o)
    return res
  }

  static clone<T>(o: T): T {
    return JSON.parse(JSON.stringify(o))
  }

  consName(): str {
    return this.o.constructor.name
  }

  isArr(): bool {
    return Array.isArray(this.o) // 'Array' === consName(this.o)
  }

  isBol(): bool {
    return 'Boolean' === this.consName()
  }

  isNum(): bool {
    return 'Number' === this.consName()
  }

  isInt(): bool {
    return 'Number' === this.consName() && Number.isInteger(this.o)
  }

  isStr(): bool {
    return 'String' === this.consName()
  }

  isFun(): bool {
    return 'Function' === this.consName()
  }

  asArr(): T[] {
    return this.isArr() ? this.o : [this.o]
  }
}
