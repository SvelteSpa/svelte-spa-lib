// Context - parent-child blocks
import layout from '@spa/block/layout'
import { getContext, setContext } from 'svelte'
import type { Writable, Readable } from 'svelte/store'
import { writable, derived } from 'svelte/store'

// component context
let compCtxKey = 'comp'

// size
export type WH = [int, int]

type CompCtx = {
  debugTag: str // TODO for debug
  wh: Writable<WH>
}

// existing (parent) context
let get = () => getContext(compCtxKey) as CompCtx

// new (child) context
let make = (debugTag: str): CompCtx => ({
  debugTag,
  wh: writable([0, 0] as WH),
})

// new (combined) context
let set = (debugTag: str): CompCtx => {
  let ctx = obj.uni($.get(), make(debugTag)) as CompCtx
  setContext(compCtxKey, ctx)
  return ctx
}

// update existing context
let upd = (w: int, h: int): CompCtx => {
  let ctx = $.get()
  ctx.wh.set([w, h])
  return ctx
}

// detect
let isWide = (): Readable<bool> => {
  let wh = $.get().wh
  return derived(wh, (wh) => layout.brk.narrow <= wh[0])
}

let $ = {
  set,
  get,
  upd,
  isWide,
}

export default $
