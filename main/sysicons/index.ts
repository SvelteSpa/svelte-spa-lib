import codes from './sysicons_codes'

export type Ico = typeof codes

let $ = new Proxy(
  {},
  {
    get: (_, prop) => {
      let key = String(prop)
      return '&#' + (codes as any)[key] + ';'
    },
  }
) as Ico

export default $
