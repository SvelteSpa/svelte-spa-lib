import any from '@spa/any'
import obj from '@spa/obj'
import run from '@spa/run'
import type { num, str } from '@spa/typs'
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

function selText(ts: LangText): str {
  let t: any
  any.isStr((t = ts)) ||
    any.isDef((t = ts[curLangIndex])) ||
    any.isDef((t = ts[0])) ||
    (t = '')

  return t
}

function lookupText(key: Key) {
  let val = dict.get(key)
  return any.isUdf(val) ? (run.isDev ? '((?))' : '') : selText(val as LangText)
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
export let ls = (ts: LangText) => selText(ts)

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
  availLangs = any.clone(ls)
  setCurLang(availLangs[0] || '')
}

function setCurLang(lang: Lang) {
  let i = availLangs.indexOf(lang)
  let l = availLangs[i] || availLangs[0] || ''
  curLangIndex = 0 <= i ? i : 0
  signal(l)
}

function addText(key: Key, val: LangText, refresh = true) {
  dict.set(key, any.clone(val))
  if (refresh) signal()
}

type DictArr = [Key, LangText][]
type DictObj = { [key: str]: LangText }

function addDict(data: DictArr | DictObj, refresh = true) {
  if (any.isArr(data))
    (data as DictArr).forEach(([k, v]) => addText(k, v, false))
  else obj.each(data as DictObj, (v, k) => addText(k, v, false))
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

// init
setAvailLangs([])

export default $
