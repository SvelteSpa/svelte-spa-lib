<script context="module" lang="ts">
  import { fade } from 'svelte/transition'
  import ico from '@spa/main/sysicons'
  import main from '@spa/main'
  import { ts } from '@spa/lang'
  import type { MenuEntry } from '.'
</script>

<script lang="ts">
  export let entries: MenuEntry[] = []
  function onClick(fun: FnVoidUnd = undefined) {
    // close and call
    main.closeMenu()
    if (fun) fun()
  }
</script>

{#if entries.length}
  <x-curtain on:click={() => onClick()} transition:fade={{ duration: 100 }}>
    <main on:click={() => onClick()}>
      <f-bcr>
        <x-icp class="off">{@html ico.left}</x-icp>
      </f-bcr>
      {#each entries as [tag, fun]}
        <div on:click|stopPropagation={() => onClick(fun)}>
          {$ts(tag)}
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
    cursor: pointer;
    padding: var(--p4);
    font-weight: bold;
  }

  div:hover {
    text-decoration: underline;
  }
</style>
