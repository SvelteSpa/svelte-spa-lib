// do first
import type { MenuEntry, LR } from '@spa/block'
import type { CompData } from '@spa/comp'
import run, { setEnv, initUserActions } from '@spa/run'
import user from '@spa/user'
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
    return args.last()
  }

  // handle escape key
  w.onkeydown = (e: any) => {
    switch (e.code) {
      case 'Escape':
        closeMenu()
        closeModalDlg()
        break
    }
  }

  // prevent triple-click selections
  w.onmousedown = (e: any) => {
    if (1 < e.detail && 'input' !== e.target.localName) e.preventDefault()
  }
}

let init = (name: str, ver: str) => {
  $.name = name
  $.ver = ver

  setTitle(name, `${name} - ${ver}`)

  schema.applyColor(1 as int)
  schema.applySizes(0 as int)
  schema.applyEffects(0 as int)

  initUserActions()

  window.onbeforeunload = () => {
    user.store()
  }

  user.restore()
}

let setTitle = (appTitle: str, docTitle: str) => {
  $.title = appTitle
  document.title = docTitle
}

// side menu
let menuEntries = writable(['l', []] as [LR, MenuEntry[]])
let onMenuClose: FnVoidUnd

let openMenu = (lr: LR, entries: MenuEntry[], onClose: FnVoidUnd) => {
  onMenuClose = onClose
  menuEntries.set([lr, entries])
}

let closeMenu = () => {
  menuEntries.set(['l', []])
  if (onMenuClose) onMenuClose()
  onMenuClose = undefined
}

// modal dialog
export type ModalData = [CompData, bool]
let modalDlg = writable(null as ModalData | null)
let onModalClose: FnVoidUnd

let busy: Writable<any> = writable(null)

let openModalDlg = (c: CompData, pad: bool, onClose: FnVoidUnd) => {
  onModalClose = onClose
  modalDlg.set([c, pad])
}

let closeModalDlg = () => {
  modalDlg.set(null)
  if (onModalClose) onModalClose()
  onModalClose = undefined
}

let $ = {
  init,
  setTitle,

  name: '',
  ver: '',
  title: '',

  key: () => $.name + ':' + $.ver + ':',

  menuEntries,
  openMenu,
  closeMenu,

  modalDlg,

  openModalDlg: (c: CompData, onClose?: FnVoidUnd) =>
    openModalDlg(c, true, onClose),

  openModalDlgPlain: (c: CompData, onClose?: FnVoidUnd) =>
    openModalDlg(c, false, onClose),

  closeModalDlg,

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
