<script context="module" lang="ts">
  import type { int } from '@spa/typs'
  import ctx from '@spa/ctx'
  import type { Brd } from './index'
  import TopHeader from './TopHeader.svelte'
  import TopBanner from './TopBanner.svelte'
  import TopNav from './TopNav.svelte'
  import TopMain from './TopMain.svelte'
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
</script>

<f-col class="whC" bind:clientWidth={w} bind:clientHeight={h}>
  <header class="wC">
    <TopHeader {brd}>
      <slot name="top-header" />
    </TopHeader>
  </header>

  <aside>
    <TopBanner {brd} {scrollPad} {scrollTop}>
      <slot name="top-banner" />
    </TopBanner>
  </aside>

  <nav>
    <TopNav {brd}>
      <slot name="top-nav" />
    </TopNav>
  </nav>

  <TopMain {brd} bind:scrollPad bind:scrollTop>
    <slot name="top-main" />
  </TopMain>

  <footer class="wC">
    <TopFooter {brd} let:expand>
      <slot name="top-footer" {expand} />
    </TopFooter>
  </footer>
</f-col>

<style>
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
</style>
