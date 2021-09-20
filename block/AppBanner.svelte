<script lang="ts">
  export let url: str
  export let show = true
</script>

{#if show}
  <img class="C" src={url} alt="" />
{/if}

<style>
  img {
    object-fit: cover;
  }
</style>
