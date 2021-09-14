import O from '@spa/obj'

type CssVars = {}
type Schema = { name?: str; color?: str; vs: CssVars }

// color schemas
let colors: Schema[] = [
  // 0 - all default values
  {
    name: 'b/w',
    color: '#fff',
    vs: {
      // primary
      'pri-fg': '#333',
      'pri-fh': '#000', // hover
      'pri-bg': '#fff',
      'pri-hr': '#666', // hr
      // secondary
      'sec-fg': '#fff',
      'sec-bg': '#999',
      'sec-brd': '#ccc', // border
      // tertiary
      'ter-fg': '#fff', // TODO menu
      'ter-bg': '#999',
      'ter-ul': '#999', // TODO - belongs to ribbon
      // badge
      'badge-fg': '#fff',
      'badge-bg': '#000',
      // icon
      'ico-sl': '#0ff', // selected
      // tip
      'tip-fg': '#fff',
      'tip-bg': '#333',
      // scrollbar
      'scb-fg': '#999',
      'scb-bg': '#eee',
      // side
      'side-bg': '#f8f8f8',
      // button
      'btn-fg': '#fff',
      'btn-bg': '#333', // background
      'btn-bs': '#666', // background selected
      'btn-bh': '#666', // background hover
      'btn-bd': '#999', // background disabled
      // controls
      'ctr-off': '#999',
      'ctr-on': '#333',
      // boxes
      'x-box': '#999',
      // inputs
      'inp-fg': '#333',
      'inp-brd': '#999',
      'err-brd': '#f00',
      // misc
      'spn-bg': '#ade', // spin
      'msg-bg': 'blue', // spin
    },
  },

  // 1
  {
    name: 'red',
    color: '#e33',
    vs: {
      'pri-hr': '#e33',
      'sec-bg': '#e33',
      'ter-bg': '#33e',
      'badge-bg': '#34a',
      'tip-bg': '#e33',
      'scb-fg': '#00f6',
      'scb-bg': '#fff',
      'btn-bg': '#b22',
      'btn-bs': '#22b',
      'btn-bh': '#e44',
      'ctr-on': '#e33',
    },
  },

  // 2
  {
    name: 'blue',
    color: '#33e',
    vs: {
      'sec-bg': '#33e',
      'btn-bg': '#22b',
      'btn-bh': '#33e',
      'ctr-bh': '#33e',
    },
  },
]

// sizes
let sizes: Schema[] = [
  // 0 - all default values
  {
    name: 'slim',
    vs: {
      // padding
      p1: '2px',
      p2: '4px',
      p4: '8px',
      p8: '16px',
      // scrollbars
      'scb-wdt': '3px',
      'scb-brd': '0px',
      // bars
      'hdr-hgt': '2.4em',
      'ftr-hgt': '2.4em',
      // buttons
      'btn-fts': '72%', // font size
      'btn-pad': '0 var(--p4)',
      'btn-mrg': 'var(--p1)',
      // hr
      'hr-mrg': 'var(--p4) 0',
    },
  },
  {
    name: 'slimScroll',
    vs: {
      // scrollbars
      'scb-wdt': '5px',
    },
  },
]

// effects
let effects: Schema[] = [
  // 0 - all default values
  {
    name: 'gentle',
    vs: {},
  },
]

function setCssVar(k: str, v: str) {
  let style = (document as any).querySelector(':root').style
  style.setProperty('--' + k, v)
}

function applyCssVars(vs: CssVars) {
  let style = (document as any).querySelector(':root').style
  O(vs).each((v, k) => style.setProperty('--' + k, v))
}

function applySchema(s: Schema[], n: int) {
  // defaults
  if (0 < n) applySchema(s, 0 as int)
  // specifics
  applyCssVars(s[n].vs)
}

let $ = {
  numColors: colors.sz,
  applyColor: (n: int) => applySchema(colors, n),
  applySizes: (n: int) => applySchema(sizes, n),
  applyEffects: (n: int) => applySchema(effects, n),
  setCssVar,
  applyCssVars,
}

export default $
