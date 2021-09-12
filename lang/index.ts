import O from '@spa/obj'
import run from '@spa/run'
import type { Writable } from 'svelte/store'
import { writable, derived, get } from 'svelte/store'

//---------------------------------------------

export type Lang = str // 'en', 'de', 'cs', ...
export type Langs = Lang[] // ['en','de','cs', ...]

let availLangs: Langs
export let curLang: Writable<Lang> = writable('')
let curLangIndex: num

type Key = str
export type LangText = str | str[]
type Dict = Map<Key, LangText>

let dict: Dict

function selText(ts: LangText, withDef = true): str {
  let t: any
  O((t = ts)).isStr() ||
    undefined !== (t = ts[curLangIndex]) ||
    (withDef && undefined !== (t = ts[0])) ||
    (t = '')

  return t
}

function lookupText(key: Key) {
  let val = dict.get(key)
  return undefined === val
    ? run.isDev
      ? '((?))'
      : ''
    : selText(val as LangText)
}

export const textProxy = new Proxy(
  {},
  {
    get: (_, prop) => {
      let key = String(prop)
      return lookupText(key)
    },
  }
)

// non-reactive
export let l: { [key: string]: str } = textProxy
export let ls = (ts: LangText, withDef = true) => selText(ts, withDef)

// reactive
export let t = derived([curLang], (_) => {
  return textProxy as any
})

export let ts = derived([curLang], (_) => {
  return (ts: LangText) => selText(ts)
})

//---------------------------------------------

function signal(l?: Lang) {
  if (!l) l = get(curLang)
  curLang.set('')
  curLang.set(l)
}

function setAvailLangs(ls: Langs) {
  dict = new Map()
  availLangs = O.clone(ls)
  setCurLang(availLangs[0] || '')
}

function setCurLang(lang: Lang) {
  let i = availLangs.indexOf(lang)
  let l = availLangs[i] || availLangs[0] || ''
  curLangIndex = 0 <= i ? i : 0
  signal(l)
}

function addText(key: Key, val: LangText, refresh = true) {
  dict.set(key, O.clone(val))
  if (refresh) signal()
}

type DictArr = [Key, LangText][]
type DictObj = { [key: string]: LangText }

function addDict(data: DictArr | DictObj, refresh = true) {
  if (O(data).isArr())
    (data as DictArr).forEach(([k, v]) => addText(k, v, false))
  else O(data as DictObj).each((v, k) => addText(k, v, false))
  if (refresh) signal()
}

let $ = {
  setAvailLangs,
  availLangs: () => availLangs,
  hasLangs: () => 0 < availLangs.length,

  setCurLang,
  curLang: () => get(curLang),

  addText,
  addDict,
}

export default $
