<script>

    import { VIEW } from "./enum"
    import { handleKeyboardShortcuts } from "./keyborad-shortcuts"
    import { ViewStore } from "./emdy-stores"

    import Editor from "./Editor.svelte"
    import Preview from "./Preview.svelte"
    import Toolbar from "./Toolbar.svelte"


    let previewWidth = 50
    let value = `# Hello, world!\n**Question:** How's it *going?*`

    $: editorClass = $ViewStore === VIEW.PREVIEW ? "d-none" : $ViewStore === VIEW.EDITOR ? "ps-2 flex-fill overflow-hidden" : "col-5 mx-0 px-0 ps-2 border-end border-light border-3"
    $: previewClass = $ViewStore === VIEW.PREVIEW ? "p-4 mx-auto" : $ViewStore === VIEW.EDITOR ? "d-none" : "col-7 mx-0 pt-2 px-5"
    $: previewStyle = $ViewStore === VIEW.PREVIEW && `width: ${previewWidth}%;`

</script>


<div id="emdy-wrapper" class="h-100 d-flex flex-column" on:keydown={handleKeyboardShortcuts}>

    <Toolbar bind:previewWidth/>

    <div id="emdy-content" class="row gx-0 flex-fill">
        <div id="emdy-editor" class={editorClass}>
            <Editor autoFocus={true} lineWrapping={true} scrollPastEnd={false} bind:value/>
        </div>
        <div id="emdy-preview" class={previewClass} style={previewStyle}>
            <Preview bind:value/>
        </div>
    </div>

</div>