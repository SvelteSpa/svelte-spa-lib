<script context="module" lang="ts">
  import type { Brd } from '.'
  import { clsBrd } from '.'
  import { notSelClick } from '.'
</script>

<script lang="ts">
  export let brd: Brd = ''
  export let onClick: FnVoidUnd = undefined

  let on = notSelClick(onClick)
</script>

<f-barC
  class={clsBrd('sec', brd) + ' sch-sec' + (onClick ? ' ptr' : '')}
  on:click={() => on.click()}
>
  <slot />
</f-barC>
