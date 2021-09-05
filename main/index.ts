// do first
import arr from '@spa/arr'
import type { MenuEntry } from '@spa/block'
import run, { setEnv, initUserActions } from '@spa/run'
import type { int, str, bool, FnVoidUnd, CompData } from '@spa/typs'
import type { Writable } from 'svelte/store'
import { writable } from 'svelte/store'
import schema from './schema'
import './schema/global.css'
import './schema/media.css'

setEnv((import.meta as any).env)

// let window
if (window) {
  let w = window as any

  // a handy tracing shortcut
  w.ll = (...args: any[]) => {
    if (run.isDev) console.log(...args)
    return arr.last(args)
  }

  // handle escape key
  w.onkeydown = (e: any) => {
    if ('Escape' === e.code) $.onEscape()
  }

  // prevent triple-click selections
  w.onmousedown = (e: any) => {
    if (1 < e.detail && 'input' !== e.target.localName) e.preventDefault()
  }
}

let init = (title: str, ver: str) => {
  setTitle(title, `${title} - ${ver}`)
  $.ver = ver

  schema.applyColor(1 as int)
  schema.applySizes(0 as int)
  schema.applyEffects(0 as int)

  initUserActions()
}

let setTitle = (appTitle: str, docTitle: str) => {
  $.title = appTitle
  document.title = docTitle
}

// side menu
let menuEntries = writable([] as MenuEntry[])
let onMenuClose: FnVoidUnd = undefined

// modal dialog
let modalDlg = writable(null as CompData | null)
let onModalClose: FnVoidUnd = undefined

let busy: Writable<any> = writable(null)

let $ = {
  init,
  setTitle,

  title: '',
  ver: '',

  onEscape: () => {},

  menuEntries,
  openMenu: (ms: MenuEntry[], onClose: FnVoidUnd) => {
    onMenuClose = onClose
    menuEntries.set(ms)
  },

  closeMenu: () => {
    menuEntries.set([])
    if (onMenuClose) onMenuClose()
    onMenuClose = undefined
  },

  modalDlg,

  openModalDlg: (c: CompData, onClose: FnVoidUnd) => {
    onModalClose = onClose
    modalDlg.set(c)
  },

  closeModalDlg: () => {
    modalDlg.set(null)
    if (onModalClose) onModalClose()
    onModalClose = undefined
  },

  // spinner
  busy,
  // isBusy: () => get(busy),
  setBusy: (on: bool) => {
    busy.set(on)
  },

  // location
  reloadUrl: () => window.location.reload(),
  replaceUrl: (url: str) => window.location.replace(url),
  urlSite: (tail: str) => window.location.origin + '/' + tail,
  urlSysAssets: (tail: str) => $.urlSite('assets/sys/') + tail,
}

export default $
