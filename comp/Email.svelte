<script type="ts">
  import Text from './Text.svelte'
  export let label: str
  export let text = ''
  export let readonly = false
  export let isValid = true
</script>

<Text
  {label}
  bind:text
  {readonly}
  toLower={true}
  bind:isValid
  re={/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/}
/>
