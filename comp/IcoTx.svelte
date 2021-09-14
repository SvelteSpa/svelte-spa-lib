<script context="module" lang="ts">
</script>

<script lang="ts">
  export let ico: num = 0
  export let icoOn: num = 0
  export let img: str = ''

  export let tx: str = ''
  export let txOn: str = ''

  export let onClick: FnVoidUnd = undefined

  export let on = false
  export let sel = false
  export let withTx = true

  $: xIco = on ? icoOn || ico : ico
</script>

{#if img}
  <img class={onClick ? 'ptr' : ''} on:click={onClick} src={img} alt="" />
{/if}
<span class={onClick ? 'ptr' : ''} on:click={onClick}>
  {#if xIco}
    <x-ico class:sel>{@html xIco}</x-ico>
  {/if}
  {#if withTx}
    {on ? txOn || tx : tx}
  {/if}
</span>

<style>
  img {
    height: 100%;
    padding: 0 var(--p2);
    vertical-align: middle;
  }

  span {
    cursor: pointer;
    padding: 0 var(--p2);
    white-space: nowrap;
  }

  x-ico.sel {
    color: var(--ico-sl);
  }
</style>
