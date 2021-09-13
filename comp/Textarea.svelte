<script type="ts">
  export let label = ''
  export let text = ''
  export let readonly = false
  export let maxlength: any = undefined

  function onChange(e: any) {
    text = e.target.value.trim()
  }
</script>

<div>
  <textarea {readonly} value={text} on:change={onChange} {maxlength} />
  <span>{label}</span>
</div>

<style>
  div {
    position: relative;
    margin: var(--p2);
    margin-top: 0.8em;
    font-size: 120%;
  }

  textarea {
    width: 100%;
    border: thin solid var(--inpOk);
    border-radius: 2px;
    resize: vertical;
  }

  span {
    position: absolute;
    top: -1.2em;
    left: calc(-1 * var(--p2));
    padding: 0 var(--p2);
    font-size: 80%;
  }
</style>
