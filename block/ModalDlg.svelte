<script context="module" lang="ts">
  import type { CompData } from './index'
  import ctx from '@spa/ctx'
  import main from '@spa/main'

  import { fade } from 'svelte/transition'
</script>

<script lang="ts">
  export let comp: CompData | null

  $: [c, ps] = comp || []

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
    <main on:click|stopPropagation={() => {}}>
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
    top: -0.6em;
    right: -0.6em;
    stroke: white;
    fill: var(--btn-bg);
    width: 1.2em;
    padding: var(--p2);
    font-size: 160%;
  }

  svg:hover {
    fill: var(--btn-bh);
  }

  main {
    position: relative;
    color: var(--pri-fg);
    background: var(--pri-bg);
    padding: var(--p2);
    border: thin solid var(--x-box);
    border-radius: var(--p4);
  }

  div {
    padding: var(--p2) var(--p4);
    overflow: auto;
  }
</style>
