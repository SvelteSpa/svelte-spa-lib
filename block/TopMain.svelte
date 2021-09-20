<script context="module" lang="ts">
</script>

<script lang="ts">
  export let scrollPad = 0 as int
  export let scrollTop = 0 as int

  let onScroll = (e: any) => {
    let t = e.target
    scrollPad = (t.scrollHeight - t.clientHeight) as int
    scrollTop = t.scrollTop
  }
</script>

<main on:scroll={onScroll}>
  <slot />
</main>

<style>
  main {
    display: flex;
    flex-flow: row nowrap;
    flex-grow: 1;
    height: 100%;
    overflow-y: scroll;
  }
</style>
