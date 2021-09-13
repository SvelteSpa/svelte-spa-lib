<script type="ts">
  import Text from './Text.svelte'
  export let label: str
  export let text = ''
  export let readonly = false
  export let allowEmpty = false
  export let isValid = true
</script>

<Text
  type="password"
  {label}
  bind:text
  {readonly}
  {allowEmpty}
  bind:isValid
  re={/....../}
/>
