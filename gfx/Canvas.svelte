<script context="module" lang="ts">
  import { onMount } from 'svelte'
  import Canvas2d from './canvas2d'
</script>

<script lang="ts">
  export let cvs: Canvas2d

  let el: HTMLCanvasElement
  onMount(() => {
    cvs = new Canvas2d(el)
  })

  let w: num, h: num
  $: if (cvs) cvs.clear({ w, h })
</script>

<div bind:clientWidth={w} bind:clientHeight={h}>
  <canvas bind:this={el} />
</div>

<style>
  div {
    width: 100%;
    height: 100%;
  }

  canvas {
    width: 100%;
    height: 100%;
    border: solid 1px #ccc;
    border-radius: 2px;
    background-color: #f5f5dc88;
  }
</style>
