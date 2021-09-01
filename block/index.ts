import run from '@spa/run'
import type { chr, str, FnVoidUnd } from '@spa/typs'

// border to separate from other components
export type Brd = '' | 'r' | 'l'

// e.g. ('pri','l' ) => 'lpriBrd'
export let clsBrd = (head: str, brd: chr) => (brd ? brd + head + 'Brd' : '')

// safe click that allows selection
export function notSelClick(onClick: FnVoidUnd) {
  let o = {
    onClick,
    click: () => {
      if (o.onClick && !run.userSelection()) o.onClick()
    },
  }

  return o
}
