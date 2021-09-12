<script context="module" lang="ts">
  import ctx from '@spa/ctx'
  import ico from '@spa/main/sysicons'
  import type { Brd } from '.'
  import BarC from './BarC.svelte'
</script>

<script lang="ts">
  export let brd: Brd = ''

  export let canExpand = true
  export let expand = false

  let onClick = canExpand
    ? () => {
        expand = !expand
      }
    : undefined

  let isWide = ctx.isWide()
  $: wide = $isWide
  $: x = canExpand && expand
</script>

<div class="whC">
  <BarC {brd} {onClick}>
    {#if canExpand}
      {#if wide}
        <x-icp>{@html ico.chUp}</x-icp>
        <f-gr />
        <slot />
        <f-gr />
        <x-icp>{@html ico.chUp}</x-icp>
      {:else}
        <f-bcrC>
          <x-icp>{@html ico.chUp}</x-icp>
        </f-bcrC>
      {/if}
    {:else}
      <slot />
    {/if}
  </BarC>
</div>
{#if x}
  <div id="over">
    <BarC {brd} {onClick}>
      <f-ccrC>
        {#if wide}
          <f-rowC>
            <x-icp>{@html ico.chDn}</x-icp>
            <f-gr />
            <x-icp>{@html ico.chDn}</x-icp>
          </f-rowC>
        {:else}
          <f-bcrC>
            <x-icp>{@html ico.chDn}</x-icp>
          </f-bcrC>
        {/if}
        <slot {expand} />
      </f-ccrC>
    </BarC>
  </div>
{/if}

<style>
  div#over {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>
