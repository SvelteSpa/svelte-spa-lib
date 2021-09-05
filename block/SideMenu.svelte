<script context="module" lang="ts">
  import { fade } from 'svelte/transition'
  import type { str, FnVoidUnd } from '@spa/typs'
  import ico from '@spa/main/sysicons'
  import main from '@spa/main'
  import type { MenuEntriesNul } from './index'
</script>

<script lang="ts">
  export let entries: MenuEntriesNul = null

  function onClick(fun: FnVoidUnd = undefined) {
    // close and call
    main.closeMenu()
    if (fun) fun()
  }
</script>

{#if entries}
  <x-curtain on:click={() => onClick()} transition:fade={{ duration: 100 }}>
    <main on:click={() => onClick()}>
      <f-bcr>
        <x-icp class="off">{@html ico.left}</x-icp>
      </f-bcr>
      {#each entries as [tx, fun]}
        <div
          class={fun ? 'ptr' : ''}
          on:click|stopPropagation={() => onClick(fun)}
        >
          {tx}
        </div>
      {/each}
    </main>
  </x-curtain>
{/if}

<style>
  main {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    color: var(--sec-fg);
    background: var(--sec-bg);
    opacity: 0.9;
    border-right: thin solid var(--sec-fg);
    overflow-x: hidden;
    overflow-y: auto;
  }

  f-bcr {
    height: var(--hdr-hgt);
    padding: var(--p2);
  }

  div {
    padding: var(--p4);
  }

  div.ptr {
    font-weight: bold;
  }
</style>
