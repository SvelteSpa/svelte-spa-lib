<script context="module" lang="ts">
  import type { int, CompData } from '@spa/typs'
  import { bigMsg, errMsg } from '@spa/run'
  import { t } from '@spa/lang'
  import main from '@spa/main'
  import ctx from '@spa/ctx'

  import ModalDlg from '@spa/block/ModalDlg.svelte'

  import type { MenuEntry } from '@spa/block'
  import SideMenu from '@spa/block/SideMenu.svelte'
</script>

<script lang="ts">
  let w = 0
  let h = 0
  $: ctx.upd(w as int, h as int)

  let menuEntries: MenuEntry[]
  main.menuEntries.subscribe((_) => (menuEntries = _))

  let modalDlg: CompData | null = null
  main.modalDlg.subscribe((_) => (modalDlg = _))
</script>

{#if $bigMsg}
  <x-sysScr>
    <div>{@html $bigMsg}</div>
    <p>
      <button on:click={() => main.reloadUrl()}>OK</button>
    </p>
  </x-sysScr>
{:else if $errMsg}
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
{:else}
  <div class="whC" bind:clientWidth={w} bind:clientHeight={h}>
    <slot />
  </div>

  <ModalDlg comp={modalDlg} />
  <SideMenu entries={menuEntries} />
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
