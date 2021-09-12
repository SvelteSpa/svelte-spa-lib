<script context="module" lang="ts">
  import run from '@spa/run'
  import type { Brd } from '.'
  import { clsBrd } from '.'
  import { slide } from 'svelte/transition'
</script>

<script lang="ts">
  export let brd: Brd = ''
  export let scrollPad = 0 as int
  export let scrollTop = 0 as int

  let el: HTMLDivElement
  let show = true
  $: if (run.inUserScroll()) {
    if (scrollTop < 20) {
      show = true
    } else {
      if (el.clientHeight < scrollPad) show = false
    }
  }
</script>

<div
  bind:this={el}
  transition:slide={{ duration: 777 }}
  class={clsBrd('pri', brd) + ' whC'}
>
  {#if show}
    <div transition:slide={{ duration: 777 }}>
      <slot />
    </div>
  {/if}
</div>
