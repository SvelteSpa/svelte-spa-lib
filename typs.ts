// Handy types
import type { SvelteComponent } from 'svelte'

export type num = number
export type int = num & { __int__: void }
export type str = string
export type chr = string
export type bool = boolean

export type tag = str | num

export type FnVoid = () => void
export type FnVoidUnd = FnVoid | undefined

export let asInt = (n: num) => n as int

export type CompData = [typeof SvelteComponent | null, { [key: string]: any }]
