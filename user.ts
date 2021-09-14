import { writable, get } from 'svelte/store'

type User = { id: int; email: str }
let nulUser: User = { id: 0 as int, email: '' }

let user = writable(nulUser)
export let loggedIn = writable(false)

let getUser = (): User => get(user)
let getId = () => getUser().id // 0 < logged in
let getEmail = () => getUser().email

let signal = () => loggedIn.set(0 < getId())

let logout = () => {
  user.set(nulUser)
  signal()
}

let login = (_: User) => {
  user.set(_)
  signal()
}

let $ = {
  getId,
  getEmail,

  logout,
  login,
}

export default $
