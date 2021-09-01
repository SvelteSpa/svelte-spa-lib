<script context="module" lang="ts">
  import type { int } from '@spa/typs'
  import type { Brd } from './index'
  import { clsBrd } from './index'
</script>

<script lang="ts">
  export let brd: Brd = ''
  export let scrollPad = 0 as int
  export let scrollTop = 0 as int

  let onScroll = (e: any) => {
    let t = e.target
    scrollPad = (t.scrollHeight - t.clientHeight) as int
    scrollTop = t.scrollTop
  }
</script>

<div class={clsBrd('pri', brd)} on:scroll={onScroll}>
  <slot />
</div>

<style>
  div {
    flex-grow: 1;
    height: 100%;
    overflow-y: scroll;
  }
</style>
