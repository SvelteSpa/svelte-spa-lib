<script context="module" lang="ts">
  import type { Brd } from './index'
  import { clsBrd } from './index'
</script>

<script lang="ts">
  export let brd: Brd = ''
</script>

<div class={clsBrd('pri', brd)}>
  <slot />
</div>
