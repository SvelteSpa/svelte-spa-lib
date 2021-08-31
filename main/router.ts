import { split } from '@spa/str'
import type { str } from '@spa/typs'
import { tick } from 'svelte'
import { readable, derived } from 'svelte/store'
import type { Readable } from 'svelte/store'

// the route follows #/, multiple stops separated by /, each multiple parts sep. by :
export type RouteStop = str[]
export type Route = RouteStop[]

let getStopHead = (stop: RouteStop): str => stop[0] || ''
let firstStopHead = (route: Route): str => getStopHead(route[0] || [])

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

// reactive
let curStop: Readable<str> = derived(curRoute, (_) => firstStopHead(_))

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

// callback
export type Cb = (head: str, route: Route) => void
let subscribe = (cb: Cb) => {
  curStop.subscribe((head) => {
    cb(head, getRoute())
  })
}

// that's all

history.scrollRestoration = 'auto'

let $ = {
  get: () => getRoute(),
  push,
  pop,
  replace,
  subscribe,
}

export default $
