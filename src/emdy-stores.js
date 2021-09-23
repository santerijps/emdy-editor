import { writable } from "svelte/store"


export const CursorStore = writable(null)
export const EditorStore = writable(null)
export const TokenStore = writable([])
export const ViewStore = writable(2)