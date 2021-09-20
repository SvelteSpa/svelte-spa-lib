<script context="module" lang="ts">
  import ctx from '@spa/ctx'
  import type { Brd } from '.'
  import TopHeader from './TopHeader.svelte'
  import TopBanner from './TopBanner.svelte'
  import TopFooter from './TopFooter.svelte'
</script>

<script lang="ts">
  // border left / right
  export let brd: Brd = ''

  ctx.set('TopBlock')

  let w = 0
  let h = 0
  $: ctx.upd(w as int, h as int)

  let scrollPad = 0 as int
  let scrollTop = 0 as int

  let onScroll = (e: any) => {
    let t = e.target
    scrollPad = (t.scrollHeight - t.clientHeight) as int
    scrollTop = t.scrollTop
  }
</script>

<f-col class="C" bind:clientWidth={w} bind:clientHeight={h}>
  <header class="wC">
    <TopHeader {brd}>
      <slot name="top-header" />
    </TopHeader>
  </header>

  <f-row class="C">
    <f-col class="C">
      <TopBanner {scrollPad} {scrollTop}>
        <slot name="top-banner" />
      </TopBanner>

      <slot name="top-nav" />

      <main on:scroll={onScroll}>
        <slot name="top-main" />
      </main>
    </f-col>
    <f-col>
      <aside>
        <slot name="top-side" />
      </aside>
    </f-col>
  </f-row>

  <footer class="wC">
    <TopFooter {brd} let:expand>
      <slot name="top-footer" {expand} />
    </TopFooter>
  </footer>
</f-col>

<style>
  f-col,
  f-row {
    overflow: clip;
  }

  header {
    height: var(--hdr-hgt);
  }

  footer {
    height: var(--ftr-hgt);
  }

  header,
  footer {
    z-index: 1;
  }

  main,
  aside {
    flex-grow: 1;
    overflow-y: scroll;
  }

  aside {
    border-left: solid thin var(--sec-brd);
  }

  aside:empty {
    display: none;
  }
</style>
