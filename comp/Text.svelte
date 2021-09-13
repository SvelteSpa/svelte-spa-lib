<script type="ts">
  export let text: str
  export let type = 'text'
  export let label = ''
  export let readonly = false
  export let toLower = false

  // validation
  export let re: RegExp | null = null
  export let allowEmpty = false
  export let isValid = true
  export let maxlength: any = 50

  // list validation and lookup
  export let list: str[] = []

  let error = false

  function test() {
    isValid = null === re || (allowEmpty && !text) || re.test(text)
    if (isValid && list) isValid = false !== list.findStr(text)
    error = !isValid
  }

  function onInput(e: any) {
    text = e.target.value.trim()
    test()
  }

  function onChange(e: any) {
    let val = e.target.value.trim()
    if (toLower) val = val.toLowerCase()
    text = e.target.value = val
  }

  // init
  $: {
    text = text || '' // handle undefined
    list = list // to trigger test
    re = re // to trigger test
    test()
  }

  // datalist
  let dl: any, inp: any
  $: if (dl) {
    dl.style.width = inp.offsetWidth + 'px'
    dl.style.left = inp.offsetLeft + 'px'
    dl.style.top = inp.offsetTop + inp.offsetHeight + 'px'

    for (let option of dl.options) {
      option.onclick = function () {
        text = inp.value = this.value
        dl.style.display = 'none'
        test()
      }
    }
  }
</script>

<div>
  {#if list}
    <input
      bind:this={inp}
      on:focus={(_) => (dl.style.display = 'block')}
      on:focusout={() => (() => dl && (dl.style.display = 'none')).delay(222)}
      {type}
      {readonly}
      value={text}
      class:error
      on:input={onInput}
      on:change={onChange}
    />
    <datalist bind:this={dl}>
      {#each list as l}
        <option>{l}</option>
      {/each}
    </datalist>
  {:else}
    <input
      {type}
      {readonly}
      value={text}
      class:error
      on:input={onInput}
      on:change={onChange}
      maxLength={maxlength}
    />
  {/if}
  <span>{label}</span>
</div>

<style>
  div {
    position: relative;
    margin: var(--p2);
    margin-top: 0.8em;
    font-size: 120%;
  }

  input {
    padding: var(--p2) var(--p4);
    border: thin solid var(--inpOk);
    border-radius: 2px;
  }

  input.error {
    border-color: var(--inpErr);
    border-width: 2px;
    outline-color: var(--inpErr);
  }

  span {
    position: absolute;
    top: -1.2em;
    left: calc(-1 * var(--p2));
    padding: 0 var(--p2);
    font-size: 80%;
  }

  datalist {
    position: absolute;
    border: thin solid var(--inpOk);
    border-radius: 2px;
    background-color: var(--bgnd);
    z-index: 1;
  }

  option {
    cursor: pointer;
    padding: var(--p2) var(--p4);
  }
</style>
