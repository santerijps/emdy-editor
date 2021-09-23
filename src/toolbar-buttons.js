import { tick } from "svelte"
import { get } from "svelte/store"
import { CursorStore, EditorStore, ViewStore } from "./emdy-stores"
import { VIEW } from "./enum"


async function viewChanged() {
    const cursor = get(CursorStore)
    const editor = get(EditorStore)
    if (cursor) {
        const doc = editor.getDoc()
        doc.setCursor(cursor)
    }
    await tick()
    editor.focus()
}


export async function togglePreview() {
    if (get(ViewStore) === VIEW.PREVIEW) ViewStore.set(VIEW.EDITOR)
    else ViewStore.set(VIEW.PREVIEW)
    await viewChanged()
}


export async function toggleSideBySide() {
    if (get(ViewStore) === VIEW.SIDEBYSIDE) ViewStore.set(VIEW.EDITOR)
    else ViewStore.set(VIEW.SIDEBYSIDE)
    await viewChanged()
}


function insertTextAtCursor(text) {

    const editor = get(EditorStore)
    const doc = editor.getDoc()
    const selection = doc.getSelection()
    const cursorStart = doc.getCursor(true)
    const cursorStop = doc.getCursor(false)
    const padding = text.indexOf("%s")

    doc.replaceSelection(text.replace("%s", selection))
    editor.focus()

    doc.setSelection({
        line: cursorStart.line,
        ch: cursorStart.ch + padding,
    }, {
        line: cursorStop.line,
        ch: cursorStop.ch + padding
    })
}


export function insertHeading() {
    insertTextAtCursor("# %s")
}


export function insertBold() {
    insertTextAtCursor("**%s**")
}


export function insertItalic() {
    insertTextAtCursor("_%s_")
}


export function insertQuote() {
    insertTextAtCursor("> %s")
}


export function insertCode() {
    insertTextAtCursor("```%s\n```")
}


export function insertLink() {
    insertTextAtCursor("[LinkText](https://%s)")
}


export function insertImage() {
    insertTextAtCursor("![AltText](https://%s)")
}


export default {
    insertBold,
    insertCode,
    insertHeading,
    insertItalic,
    insertLink,
    insertImage,
    insertQuote,
    togglePreview,
    toggleSideBySide,
}