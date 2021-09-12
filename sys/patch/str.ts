export {}

declare global {
  interface String {
    size(): int
    last(): chr | undefined
    butLast(): chr | undefined
    // split a string by separator, optionally trim and throw out empty strings
    xsplit(sep?: str, trim?: bool, withEmpties?: bool)
  }
}

let $$ = String.prototype

$$.size = function (): int {
  return this.length
}

$$.last = function () {
  return [...this].slice(-1)[0]
}

$$.butLast = function () {
  if (!this.length) return undefined
  let a = [...this]
  a.pop()
  return a.join()
}

$$.xsplit = function (sep: str = '\n', trim = true, withEmpties = false) {
  return this.split(sep)
    .map((_) => (trim ? _.trim() : _))
    .filter((_) => withEmpties || _.trim())
}
