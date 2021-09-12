export {}

declare global {
  interface Number {
    // type coercion (where in Svelte 'as ...' is not allowed)
    asInt(): int
  }
}

let $$ = Number.prototype

$$.asInt = function () {
  return this as int
}
