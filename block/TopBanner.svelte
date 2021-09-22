<script context="module" lang="ts">
  import run from '@spa/run'
  import { slide } from 'svelte/transition'
</script>

<script lang="ts">
  export let scrollPad = 0 as int
  export let scrollTop = 0 as int

  let el: HTMLDivElement
  let hide = false
  $: if (run.inUserScroll()) {
    if (scrollTop < 20) {
      hide = false
    } else {
      if (el.clientHeight < scrollPad) hide = true
    }
  }
</script>

<div class:hide bind:this={el}>
  <slot />
</div>

<style>
  div {
    max-height: 100%;
    transition: max-height 0.7s ease-in-out;
  }

  div.hide {
    max-height: 0;
  }
</style>
