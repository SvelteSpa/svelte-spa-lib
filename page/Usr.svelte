<script context="module" lang="ts">
  import { fade } from 'svelte/transition'
</script>

<script lang="ts">
  export let msg: any
  export let onClose = () => {}

  $: if (msg) onClose.debounce(5678)()
</script>

{#if msg}
  <f-ccrC on:click={() => onClose()} transition:fade={{ duration: 444 }}>
    <div>
      {msg}
    </div>
  </f-ccrC>
{/if}

<style>
  f-ccrC {
    position: fixed;
    bottom: 2em;
    left: center;
    z-index: 3;
  }

  div {
    color: var(--ter-fg);
    background: var(--ter-bg);
    padding: var(--p8);
    border-radius: 4px;
    z-index: 3;
  }
</style>
