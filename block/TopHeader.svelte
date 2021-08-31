<script context="module" lang="ts">
  import type { Brd } from './index'
  import BarC from './BarC.svelte'
</script>

<script lang="ts">
  export let brd: Brd = ''
</script>

<BarC {brd}>
  <slot />
</BarC>
