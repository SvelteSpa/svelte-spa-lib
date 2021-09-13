<script context="module" lang="ts">
  import { onMount } from 'svelte'
  import { CodeJar } from './codejar/codejar'
  import type { Position } from './codejar/codejar'
  export type Pos = [s: int, e: int]
  export type Set = (tx: str, p?: Pos) => void
  export type SetPos = (p?: Pos) => void
  export type Cb = (tx: str, p: Pos) => str // used as highlight
</script>

<script lang="ts">
  export let cb: Cb
  export const set: Set = (tx, p?: Pos) => {
    jar.updateCode(tx)
    setPos(p)
  }

  export const setPos: SetPos = (p?: Pos) => {
    jar.restore(toPosition(p))
  }

  let jar: CodeJar

  let toPos = (p?: Position): Pos => {
    let { start, end } = p || { start: 0, end: 0 }
    return [start as int, end as int]
  }

  let toPosition = (p?: Pos): Position => {
    let e = el.textContent.sz
    let [start, end] = p || [e as int, e as int]
    return { start, end }
  }

  const highlightCb = (ed: HTMLElement, p?: Position) => {
    ed.innerHTML = cb(ed.textContent as str, toPos(p))
  }

  let el: any
  onMount(() => {
    jar = CodeJar(el, highlightCb, { msHighlight: 633 })
  })
</script>

<pre class="editor" bind:this={el} />

<style>
  pre {
    width: 100%;
    padding: var(--p2) var(--p4);
    border: thin solid var(--inp-brd);
    border-radius: 2px;
    font-family: var(--fnt-fix);
  }
</style>
