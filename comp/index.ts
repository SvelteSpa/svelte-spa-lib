import type { SvelteComponent } from 'svelte'

export type CompData = [typeof SvelteComponent | null, { [key: string]: any }]
