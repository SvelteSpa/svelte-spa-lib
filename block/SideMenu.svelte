<script context="module" lang="ts">
  import { fade } from 'svelte/transition'
  import ico from '@spa/main/sysicons'
  import main from '@spa/main'
  import { ts } from '@spa/lang'
  import type { MenuEntry, LR } from '.'
</script>

<script lang="ts">
  export let entries: MenuEntry[] = []
  export let lr: LR = 'l' // the other menu (on the right)
  $: left = 'l' == lr
  function onClick(fun?: FnVoidUnd) {
    // close and call
    main.closeMenu()
    if (fun) fun()
  }
</script>

{#if entries.sz}
  <x-curtain on:click={() => onClick()} transition:fade={{ duration: 100 }}>
    <main class={left ? 'l' : 'r'} on:click={() => onClick()}>
      <f-bcr>
        <x-icp class="off">{@html left ? ico.left : ico.right}</x-icp>
      </f-bcr>
      {#each entries as [tag, fun]}
        <div class:fun on:click|stopPropagation={() => onClick(fun)}>
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
    color: var(--sec-fg);
    background: var(--sec-bg);
    opacity: 0.9;
    border-right: thin solid var(--sec-fg);
    overflow-x: hidden;
    overflow-y: auto;
  }

  main.l {
    left: 0;
  }

  main.r {
    right: 0;
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

  div.fun:hover {
    text-decoration: underline;
  }
</style>
