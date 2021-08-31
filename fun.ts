import type { num } from '@spa/typs'

let $ = {
  nul: () => {},

  delay: (cb: () => void, ms: num) => setTimeout(cb, ms),

  debounce: (cb: any, ms: num) => {
    // timeout: window v. node - different types
    let to: ReturnType<typeof setTimeout>
    return (...args: any) => {
      clearTimeout(to)
      to = setTimeout(() => cb(...args), ms)
    }
  },
}

export default $
