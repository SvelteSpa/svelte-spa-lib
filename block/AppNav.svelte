<script lang="ts">
  export let show = true
</script>

{#if show}
  <slot />
{/if}
