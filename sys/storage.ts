// storage
import main from '@spa/main'

let k = (key: str) => main.key() + key

let $ = {
  // encode
  enc: (val: any) => JSON.stringify(val),

  // decode
  dec: (s: str | null, def: any = null) => {
    if (null == s) return def
    try {
      return JSON.parse(s)
    } catch (err) {
      return def
    }
  },

  set: (key: str, val: any) => {
    sessionStorage.setItem(k(key), $.enc(val))
  },

  setLocal: (key: str, val: any) => {
    localStorage.setItem(k(key), $.enc(val))
  },

  get: (key: str, def: any): any => {
    return $.dec(sessionStorage.getItem(k(key)), def)
  },

  del: (key: str): any => {
    sessionStorage.removeItem(k(key))
  },
}

export default $
