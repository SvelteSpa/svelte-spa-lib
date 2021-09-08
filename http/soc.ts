import type { str } from '@spa/typs'

// let link = (url: str, route: any) => encodeURIComponent(`${url}/#/${route}`)
let link = (url: str) => url //encodeURIComponent(url)

let $ = {
  fbLink: (url: str) =>
    `https://www.facebook.com/sharer/sharer.php?u=${link(url)}`,
  twLink: (url: str, text: str) =>
    `https://twitter.com/intent/tweet?url=${link(url)}&text=${text}`,
}

export default $
