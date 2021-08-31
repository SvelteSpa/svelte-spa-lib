<script context="module" lang="ts">
  import type { bool } from '@spa/typs'
</script>

<script lang="ts">
  export let expand: bool
</script>

{#if expand}
  2
{:else}
  1
{/if}
