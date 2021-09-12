export {}

declare global {
  interface Function {
    delay(ms: num): ReturnType<typeof setTimeout>
    debounce(ms: num): (...args: any) => void
  }
}

let $$ = Function.prototype

$$.delay = function (ms: num) {
  return setTimeout(this, ms)
}

$$.debounce = function (ms: num) {
  let to: ReturnType<typeof setTimeout>
  return (...args: any) => {
    clearTimeout(to)
    to = setTimeout(() => this(...args), ms)
  }
}
