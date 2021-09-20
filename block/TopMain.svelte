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

<div on:scroll={onScroll}>
  <slot />
</div>

<style>
  div {
    flex-grow: 1;
    overflow-y: scroll;
  }
  div {
    border: blue 2px solid;
  }
</style>
