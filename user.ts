import { writable, get } from 'svelte/store'
import storage from './sys/storage'

type User = { id: int; email: str }
let nulUser: User = { id: 0 as int, email: '' }

export let user = writable(nulUser)

let getUser = (): User => get(user)
let getId = () => getUser().id // 0 < logged in
let getEmail = () => getUser().email

let logout = () => {
  user.set(nulUser)
}

let login = (_: User) => {
  user.set(_)
}

let storageKey = 'login'

let $ = {
  getId,
  getEmail,

  logout,
  login,

  store: () => {
    storage.set(storageKey, getUser())
  },
  restore: () => {
    user.set(storage.get(storageKey, nulUser))
  },
}

export default $
