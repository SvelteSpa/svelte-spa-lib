import type { Assertable } from '@spa/assert'
import assert from '@spa/assert'
import { writable } from 'svelte/store'

export let setEnv = (env: any) => {
  $.isDev = env.DEV
  $.isProd = env.PROD
}

export let errMsg = writable('')
export let bigMsg = writable('')
export let usrMsg = writable('')

// attempt to detect if *user* is scrolling
let inUserScroll = false
let userScrollTimer: any

let begUserScroll = () => {
  inUserScroll = true
}

let endUserScroll = () => {
  clearTimeout(userScrollTimer)
  inUserScroll = false
}

let timUserScroll = () => {
  begUserScroll()
  userScrollTimer = setTimeout(endUserScroll, 333)
}

export let initUserActions = () => {
  // between down .. up
  let w = window as any // because of .onmousewheel
  w.onmousedown = begUserScroll
  w.onmouseup = endUserScroll
  // a while after
  w.onmousewheel = timUserScroll
  w.ontouchmove = timUserScroll
}

let userSelection = () => {
  let sel = window.getSelection()
  return sel ? sel.toString() : ''
}

let $ = {
  isDev: false,
  isProd: true,

  assert,

  // validate and abort
  sysErr: (val: Assertable, msgFun = () => '') =>
    $.assert(val, () => 'syserr - ' + msgFun()),

  // validate, print msg, continue
  sysChk: (val: Assertable, msgFun: () => str): Assertable => {
    if (!val) $.TR(0, msgFun)
    return val
  },

  // trace
  // levels: 0-always, 1-development
  TR(lvl: number, msgFun: () => str) {
    let trLvl = $.isDev ? 1 : 0
    if (lvl <= trLvl) console.info('> ', msgFun())
  },

  // development.time function call
  DEV(fun: () => void) {
    if ($.isDev) fun()
  },

  // show system screen: message
  setBigMsg: (msg: str) => bigMsg.set(msg),
  // show system screen: error
  setErrMsg: (msg: str) => errMsg.set(msg),
  // show user message
  setUsrMsg: (msg: str) => usrMsg.set(msg),

  inUserScroll: () => inUserScroll,
  userSelection,
}

export default $
