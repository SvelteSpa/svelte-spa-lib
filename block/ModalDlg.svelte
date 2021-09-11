<script context="module" lang="ts">
  import type { ModalData } from '@spa/main'
  import ctx from '@spa/ctx'
  import main from '@spa/main'

  import { fade } from 'svelte/transition'
</script>

<script lang="ts">
  export let dlg: ModalData | null

  $: [[c, ps], pad] = dlg || [[], true]

  let wh = ctx.get().wh
  $: [w, h] = $wh

  let el: HTMLDivElement
  $: if (el) {
    el.style.maxWidth = `calc(${w}px - 3em)`
    el.style.maxHeight = `calc(${h}px - 4em)`
  }

  function close() {
    main.closeModalDlg()
  }
</script>

{#if c}
  <x-curtain on:click={close} transition:fade={{ duration: 100 }}>
    <main class:pad on:click|stopPropagation={() => {}}>
      <div bind:this={el}>
        <svelte:component this={c} {...ps} />
      </div>
      <span on:click={close}>
        <svg viewBox="-32 -32 64 64">
          <circle r="28" />
          <g stroke-width="7">
            <line x1="-11" y1="-11" x2="11" y2="11" />
            <line x1="-11" y1="11" x2="11" y2="-11" />
          </g>
        </svg>
      </span>
    </main>
  </x-curtain>
{/if}

<style>
  svg {
    position: absolute;
    top: -1em;
    right: -1em;
    stroke: white;
    fill: var(--btn-bg);
    width: 2em;
  }

  svg:hover {
    fill: var(--btn-bh);
  }

  main {
    position: relative;
    color: var(--pri-fg);
    background: var(--pri-bg);
    border: thin solid var(--x-box);
  }

  main.pad {
    padding: var(--p2);
    border-radius: var(--p4);
  }

  main div {
    overflow-x: hidden;
    overflow-y: auto;
  }

  main.pad div {
    padding: var(--p2) var(--p4);
    overflow: auto;
  }
</style>
