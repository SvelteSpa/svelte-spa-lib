import type { LangText } from '@spa/lang'
import run from '@spa/run'

// left-right
export type LR = 'l' | 'r'

// border to separate from other components
export type Brd = '' | LR

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

// side menu
export type MenuEntry = [tag: LangText, fun?: FnVoid]

// footer items
export type FooterEntry = [tag: LangText, textOrFun: LangText | FnVoid]
