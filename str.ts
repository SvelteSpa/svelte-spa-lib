// string manipulation
import type { str } from '@spa/typs'

// split a string by separator, optionally trim and throw out empty strings
export let split = (s: str, sep: str, trim = true, withEmpties = false) =>
  s
    .split(sep)
    .map((_) => (trim ? _.trim() : _))
    .filter((_) => withEmpties || _.trim())

export let last = (s: str) => [...s].slice(-1)[0]

export let butLast = (s: str) => {
  if (!s.length) return undefined
  let a = [...s]
  a.pop()
  return a.join()
}
