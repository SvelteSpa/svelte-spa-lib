// storage
import main from '@spa/main'

let k = (key: str) => main.key() + key

// encode
let enc = (val: any) => JSON.stringify(val)

// decode
let dec = (s: str | null, def: any = null) => {
  if (null == s) return def
  try {
    return JSON.parse(s)
  } catch (err) {
    return def
  }
}

let setStorage =
  (storage: Storage) =>
  <T>(key: str, val: T): void => {
    let item = k(key)
    if (null == val) storage.removeItem(item)
    else storage.setItem(item, enc(val))
  }

let getStorage =
  (storage: Storage) =>
  <T>(key: str, def: T): T =>
    Object.assign(def, dec(storage.getItem(k(key)), def))

let delStorage =
  (storage: Storage) =>
  (key: str): void => {
    storage.removeItem(k(key))
  }

let $ = {
  set: setStorage(sessionStorage),
  setLocal: setStorage(localStorage),
  get: getStorage(sessionStorage),
  getLocal: getStorage(localStorage),
  del: delStorage(sessionStorage),
  delLocal: delStorage(localStorage),
}

export default $
