import type { str } from '@spa/typs'

let url = 'TODO'

let link = (tag: any) => encodeURIComponent(`${url}/#/${tag}`)

let $ = {
  fbLink: () => `https://www.facebook.com/sharer/sharer.php?u=${link('fb')}`,
  twLink: (text: str) =>
    `https://twitter.com/intent/tweet?url=${link('tw')}&text=${text}`,
}

export default $

// <x-soc>
// <a target="_eshop_external" href={fbLink}>
//   <img class="sm" alt="" src={app.urlAssets + 'facebook.png'} />
// </a>
// </x-soc>
// {:else if 'T' === m}
// <x-soc>
// <a target="_eshop_external" href={twLink}>
//   <img class="sm" alt="" src={app.urlAssets + 'twitter.png'} />
// </a>
// </x-soc>
// {:else if 'I' === m}
// <x-soc>
// <a target="_eshop_external" href="https://www.instagram.com">
//   <img class="sm" alt="" src={app.urlAssets + 'instagram.png'} />
// </a>
// </x-soc>

// https://twitter.com/intent/tweet?url=https://fabrika.kestolu.cz?tw=33002&text=11%20%20Pizza%20Regina
// https://www.facebook.com/login.php?skip_api_login=1&api_key=966242223397117&signed_next=1&next=https://www.facebook.com/sharer/sharer.php?u=https%253A%252F%252Ffabrika.kestolu.cz%253Ffb%253D33002&cancel_url=https://www.facebook.com/dialog/close_window/?app_id=966242223397117&connect=0#_=_&display=popup&locale=de_DE
