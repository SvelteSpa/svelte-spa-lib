<script context="module" lang="ts">
  import type { Brd } from '.'
  import { clsBrd } from '.'
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

<main class={clsBrd('pri', brd)}>
  <div on:scroll={onScroll}>
    <slot />
  </div>
  <div>Bassket</div>
</main>

<style>
  main {
    display: flex;
    flex-flow: row nowrap;
    flex-grow: 1;
    height: 100%;
    overflow-y: hidden;
  }

  div {
    overflow-y: scroll;
  }
</style>
