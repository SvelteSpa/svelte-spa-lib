<script context="module" lang="ts">
  import type { Langs, Lang } from '@spa/lang'
</script>

<script lang="ts">
  import lang, { curLang } from '@spa/lang'

  let ls: Langs, cl: Lang
  $: if ($curLang) {
    ls = lang.availLangs()
    cl = lang.curLang()
  }

  function sel(l: Lang) {
    lang.setCurLang(l)
  }
</script>

{#if 1 < ls.sz}
  <div>
    {#each ls as l}
      <span class:sel={cl == l} on:click={() => sel(l)}>{l}</span>
    {/each}
  </div>
{/if}

<style>
  div {
    margin: var(--p2);
  }

  span {
    cursor: pointer;
    padding: 0 var(--p2);
  }

  span.sel {
    font-weight: bold;
  }

  span {
    padding: 0 var(--p2);
    border-left: thin solid;
  }

  span:last-child {
    padding: 0 var(--p2);
    border-right: thin solid;
  }
</style>
