<script lang="ts">
  export let url: string
  export let show = true
</script>

{#if show}
  <img class="whC" src={url} alt="" />
{/if}

<style>
  img {
    object-fit: cover;
  }
</style>
