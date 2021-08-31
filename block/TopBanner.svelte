<script context="module" lang="ts">
  import type { int } from '@spa/typs'
  import type { Brd } from './index'
  import { clsBrd } from './index'
  import { slide } from 'svelte/transition'
</script>

<script lang="ts">
  export let brd: Brd = ''
  export let scrollPad = 0 as int
  export let scrollTop = 0 as int

  let el: HTMLDivElement
  $: show = scrollTop < 20 || (el && el.clientHeight > scrollPad)
</script>

{#if show}
  <div
    bind:this={el}
    class={clsBrd('pri', brd) + ' whC'}
    transition:slide={{ duration: 777 }}
  >
    <slot />
  </div>
{/if}
