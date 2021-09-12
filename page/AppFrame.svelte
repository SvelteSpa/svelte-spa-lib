<script context="module" lang="ts">
  import type { ModalData } from '@spa/main'
  import { usrMsg, bigMsg, errMsg } from '@spa/run'
  import { t } from '@spa/lang'
  import main from '@spa/main'
  import ctx from '@spa/ctx'

  import ModalDlg from '@spa/block/ModalDlg.svelte'

  import type { MenuEntry } from '@spa/block'
  import SideMenu from '@spa/block/SideMenu.svelte'
  import Usr from './Usr.svelte'
</script>

<script lang="ts">
  let w = 0
  let h = 0
  $: ctx.upd(w as int, h as int)

  let menuEntries: MenuEntry[]
  main.menuEntries.subscribe((_) => (menuEntries = _))

  let modalDlg: ModalData | null = null
  main.modalDlg.subscribe((_) => (modalDlg = _))
</script>

{#if $errMsg}
  <x-sysScr>
    <img class="sm" alt="" src={main.urlSysAssets('error.png')} />
    <div>[ {@html $errMsg} ]</div>
    <div>
      {@html $t.errMsg}
    </div>
    <p>
      <button on:click={() => main.reloadUrl()}>OK</button>
    </p>
  </x-sysScr>
{:else if $bigMsg}
  <x-sysScr>
    <div>{@html $bigMsg}</div>
    <p>
      <button on:click={() => main.reloadUrl()}>OK</button>
    </p>
  </x-sysScr>
{:else}
  <div class="whC" bind:clientWidth={w} bind:clientHeight={h}>
    <slot />
  </div>

  <ModalDlg dlg={modalDlg} />
  <SideMenu entries={menuEntries} />
  <Usr msg={$usrMsg} onClose={() => usrMsg.set('')} />
{/if}

<style>
  x-sysScr img {
    max-width: 80vw;
    max-height: 80vw;
  }

  x-sysScr div {
    margin: 0.4em;
    text-align: center;
  }
</style>
