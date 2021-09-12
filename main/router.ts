import main from '@spa/main'
import { tick } from 'svelte'
import { readable, get } from 'svelte/store'
import type { Readable } from 'svelte/store'

// the route follows #/, multiple stops separated by /, each multiple parts sep. by :
export type RouteStop = str[]
export type Route = RouteStop[]

let encode = (_: str) => encodeURIComponent(_)
let decode = (_: str) => decodeURIComponent(_)

let encodeRoute = (route: Route): str =>
  '#/' + route.map((_) => _.map((_) => encode(_)).join(':')).join('/')

let decodeRoute = (route: str): Route => {
  let hashPos = route.indexOf('#/')
  return 0 <= hashPos
    ? split(route.substr(hashPos + 1), '/').map((_) =>
        split(_, ':').map((_) => decode(_))
      )
    : []
}

let getRoute = (): Route => decodeRoute(window.location.href)

// reactive
let curRoute: Readable<Route> = readable(
  null as any as Route,
  function start(set) {
    set(getRoute())

    const update = () => {
      set(getRoute())
    }

    window.addEventListener('hashchange', update, false)

    return function stop() {
      window.removeEventListener('hashchange', update, false)
    }
  }
)

// history
async function push(route: Route, title = ''): Promise<void> {
  await tick()

  history.replaceState(
    {
      ...history.state,
    },
    title
  )

  window.location.hash = encodeRoute(route)
}

async function pop(): Promise<void> {
  await tick()
  window.history.back()
}

async function replace(route: Route, title = ''): Promise<void> {
  await tick()

  try {
    const newState = {
      ...history.state,
    }
    window.history.replaceState(newState, title, encodeRoute(route))
  } catch (e) {}

  // trigger the event
  window.dispatchEvent(new Event('hashchange'))
}

// util
let firstStop = (): RouteStop => $.get()[0] || []
let stopHead = (stop: RouteStop): str => stop[0] || ''
let stopPar = (stop: RouteStop): str => stop[1] || ''

// callback
export type Cb = (head: str) => void
let subscribe = (cb: Cb) => {
  curRoute.subscribe((_) => {
    main.closeModalDlg()
    cb(stopHead(firstStop()))
  })
}

// that's all

history.scrollRestoration = 'auto'

let $ = {
  get: () => get(curRoute),
  push,
  pop,
  replace,
  subscribe,

  firstStop,
  stopHead,
  stopPar,

  par: () => stopPar(firstStop()),
}

export default $
