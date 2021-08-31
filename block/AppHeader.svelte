<script context="module" lang="ts">
  import type { str, bool, FnVoid } from '@spa/typs'
  import ctx from '@spa/ctx'
  import ico from '@spa/main/sysicons'
  import lang, { t } from '@spa/lang'
  import IcoTx from '@spa/comp/IcoTx.svelte'
  import LangChoice from './LangChoice.svelte'
</script>

<script lang="ts">
  export let urlLogo: str = ''
  export let title: str = ''

  type FnPromise = () => Promise<void>
  async function onFn(cb: FnPromise | null, flip: (_: bool) => void) {
    if (cb) {
      flip(true)
      await cb()
      flip(false)
    }
  }

  export let onMenu: FnPromise | null = null
  export let onHome: FnVoid
  export let onCog: FnPromise | null = null
  export let onUser: FnPromise | null = null

  let menuOn = false
  function menu() {
    onFn(onMenu, (b) => (menuOn = b))
  }

  function home() {
    onHome()
  }

  let userOn = false
  function user() {
    onFn(onUser, (b) => (userOn = b))
  }

  let cogOn = false
  function cog() {
    onFn(onCog, (b) => (cogOn = b))
  }

  let isWide = ctx.isWide()
</script>

<f-barC>
  {#if onMenu}
    <IcoTx ico={ico.menu1} onClick={menu} sel={menuOn} />
  {/if}
  {#if urlLogo}
    <IcoTx
      img={urlLogo}
      tx={title}
      onClick={home}
      withTx={$isWide || !urlLogo}
    />
  {/if}
  {#if lang.hasLangs()}<span><LangChoice /></span>{/if}
  <f-gr />
  {#if onUser}
    <IcoTx
      ico={ico.user0}
      icoOn={ico.user1}
      tx={$t.user0}
      txOn={$t.user1}
      onClick={user}
      sel={userOn}
      withTx={$isWide}
    />
  {/if}
  {#if onCog}
    <IcoTx ico={ico.cog1} onClick={cog} sel={cogOn} />
  {/if}
</f-barC>
