<script>

    import { onMount, afterUpdate } from "svelte"
    import { fly } from "svelte/transition"
    import Editor from "./Editor.svelte"
    import Preview from "./Preview.svelte"


    let currentCursor = null
    let editor = null
    let tokenTypes = []
    let value = `# Hello, world!
**NOTE!** Here's some simple _Python_ code:
\`\`\`python
def f(x):
    return pow(x, 2)


if __name__ == "__main__":
    print(f(4))
\`\`\`

What is the output?`


    afterUpdate(() => {

        editor.on("cursorActivity", () => {
            const doc = editor.getDoc()
            const cursor = doc.getCursor()
            const type = editor.getTokenTypeAt(cursor)
            tokenTypes = type ? type.split(" ") : []
            currentCursor = cursor
        })

    })


    const VIEW = {
        EDITOR: 0,
        PREVIEW: 1,
        SIDEBYSIDE: 2,
    }

    let view = VIEW.SIDEBYSIDE
    let passiveClass = "btn shadow-none toolbar-button"
    let activeClass = "btn shadow-none toolbar-button-active"
    let previewWidth = 50


    function viewChanged() {
        if (currentCursor) {
            console.log(+ new Date, "view changed", editor)
            const doc = editor.getDoc()
            doc.setCursor(currentCursor)
        }
    }

    function togglePreview() {
        view = +!+(view === VIEW.PREVIEW) && VIEW.PREVIEW
        viewChanged()
    }


    function toggleSideBySide() {
        view = +!+(view === VIEW.SIDEBYSIDE) && VIEW.SIDEBYSIDE
        viewChanged()
    }


    function insertTextAtCursor(text) {

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


    function insertHeading() {
        insertTextAtCursor("# %s")
    }


    function insertBold() {
        insertTextAtCursor("**%s**")
    }


    function insertItalic() {
        insertTextAtCursor("_%s_")
    }


    function insertQuote() {
        insertTextAtCursor("> %s")
    }


    function insertCode() {
        insertTextAtCursor("```%s\n```")
    }


    function insertLink() {
        insertTextAtCursor("[Link](https://%s)")
    }


    function insertImage() {
        insertTextAtCursor("![Link](https://%s)")
    }


    async function handleKeyBindings(event) {
        if (event.ctrlKey && event.altKey) {
            switch (event.key) {
                case "q":
                    event.preventDefault()
                    return insertQuote()
                case "c":
                    event.preventDefault()
                    return insertCode()
                case "h":
                    event.preventDefault()
                    return insertHeading()
                case "b":
                    event.preventDefault()
                    return insertBold()
                case "i":
                    event.preventDefault()
                    return insertItalic()
                case "F9":
                    return togglePreview()
                case "F10":
                    return toggleSideBySide()
                default:
                    return
            }
        }
    }

</script>


<svelte:head>
    <link rel="stylesheet" href="/dist/css/bootstrap.min.css">
    <script src="/dist/js/bootstrap.bundle.min.js"></script>
</svelte:head>


<svelte:body on:keydown={handleKeyBindings}/>


<div id="emdy-wrapper" class="h-100 d-flex flex-column">

    <nav id="emdy-toolbar" class="row mx-0 p-2 border-bottom border-light border-3" style="background: ghostwhite;">
        <div class="col-1">
            <a href="https://www.markdownguide.org/basic-syntax/" class="btn shadow-none toolbar-button" target="_blank" title="Get Help" style="color: teal;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                </svg>
            </a>
        </div>
        <div class="col-2 btn-group">
            <button class={view === VIEW.PREVIEW ? activeClass : passiveClass} title="Preview" on:click={togglePreview}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                  </svg>
            </button>
            <button class={view === VIEW.SIDEBYSIDE ? activeClass : passiveClass} title="Side-by-Side" on:click={toggleSideBySide}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-layout-split" viewBox="0 0 16 16">
                    <path d="M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3zm8.5-1v12H14a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H8.5zm-1 0H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h5.5V2z"/>
                </svg>
            </button>
        </div>
        <div class="col-3">
            {#if view === VIEW.PREVIEW}
            <input type="range" class="form-range" min="20" max="90" step="0.5" bind:value={previewWidth} title="Preview width" in:fly={{ duration: 200, x: -50 }}/>
            {:else}
            <div class="btn-group" in:fly={{ duration: 200, x: -50 }}>
                <button class={tokenTypes.includes("header") ? activeClass : passiveClass} title="Insert heading" on:click={insertHeading}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-type" viewBox="0 0 16 16">
                        <path d="m2.244 13.081.943-2.803H6.66l.944 2.803H8.86L5.54 3.75H4.322L1 13.081h1.244zm2.7-7.923L6.34 9.314H3.51l1.4-4.156h.034zm9.146 7.027h.035v.896h1.128V8.125c0-1.51-1.114-2.345-2.646-2.345-1.736 0-2.59.916-2.666 2.174h1.108c.068-.718.595-1.19 1.517-1.19.971 0 1.518.52 1.518 1.464v.731H12.19c-1.647.007-2.522.8-2.522 2.058 0 1.319.957 2.18 2.345 2.18 1.06 0 1.716-.43 2.078-1.011zm-1.763.035c-.752 0-1.456-.397-1.456-1.244 0-.65.424-1.115 1.408-1.115h1.805v.834c0 .896-.752 1.525-1.757 1.525z"/>
                    </svg>
                </button>
                <button class={tokenTypes.includes("strong") ? activeClass : passiveClass} title="Insert bold" on:click={insertBold}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-type-bold" viewBox="0 0 16 16">
                        <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/>
                    </svg>
                </button>
                <button class={tokenTypes.includes("em") ? activeClass : passiveClass} title="Insert italic" on:click={insertItalic}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-type-italic" viewBox="0 0 16 16">
                        <path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/>
                    </svg>
                </button>
                <button class="btn shadow-none toolbar-button" title="Insert a blockquote" on:click={insertQuote}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-blockquote-left" viewBox="0 0 16 16">
                        <path d="M2.5 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11zm5 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6zm0 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6zm-5 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11zm.79-5.373c.112-.078.26-.17.444-.275L3.524 6c-.122.074-.272.17-.452.287-.18.117-.35.26-.51.428a2.425 2.425 0 0 0-.398.562c-.11.207-.164.438-.164.692 0 .36.072.65.217.873.144.219.385.328.72.328.215 0 .383-.07.504-.211a.697.697 0 0 0 .188-.463c0-.23-.07-.404-.211-.521-.137-.121-.326-.182-.568-.182h-.282c.024-.203.065-.37.123-.498a1.38 1.38 0 0 1 .252-.37 1.94 1.94 0 0 1 .346-.298zm2.167 0c.113-.078.262-.17.445-.275L5.692 6c-.122.074-.272.17-.452.287-.18.117-.35.26-.51.428a2.425 2.425 0 0 0-.398.562c-.11.207-.164.438-.164.692 0 .36.072.65.217.873.144.219.385.328.72.328.215 0 .383-.07.504-.211a.697.697 0 0 0 .188-.463c0-.23-.07-.404-.211-.521-.137-.121-.326-.182-.568-.182h-.282a1.75 1.75 0 0 1 .118-.492c.058-.13.144-.254.257-.375a1.94 1.94 0 0 1 .346-.3z"/>
                    </svg>
                </button>
                <button class="btn shadow-none toolbar-button" title="Insert a code block" on:click={insertCode}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-code" viewBox="0 0 16 16">
                        <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z"/>
                    </svg>
                </button>
                <button class="btn shadow-none toolbar-button" title="Insert a link" on:click={insertLink}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">
                        <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
                        <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
                    </svg>
                </button>
                <button class="btn shadow-none toolbar-button" title="Insert an image" on:click={insertImage}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                        <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                    </svg>
                </button>
            </div>
            {/if}
        </div>
        <div class="col text-end">
            <button class="btn btn-outline-success shadow-none" title="Save">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-save" viewBox="0 0 16 16">
                    <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
                </svg>
            </button>
        </div>
    </nav>

    {#if view === VIEW.PREVIEW}

    <div id="emdy-preview" class="p-4 mx-auto" style={`width: ${previewWidth}%;`} in:fly={{ duration: 200, y: 50 }}>
        <Preview bind:value/>
    </div>

    {:else if view === VIEW.SIDEBYSIDE}

    <div id="emdy-side-by-side" class="row gx-0 flex-fill">
        <div id="emdy-editor" class="col-5 mx-0 px-0 ps-2 border-end border-light border-3">
            <Editor autoFocus={true} lineWrapping={true} scrollPastEnd={false} bind:editor bind:value/>
        </div>
        <div id="emdy-preview" class="col-7 mx-0 pt-2 px-5">
            <Preview bind:value/>
        </div>
    </div>

    {:else} <!-- EDITOR -->

    <div id="emdy-editor" class="ps-2 flex-fill overflow-hidden">
        <Editor autoFocus={true} lineWrapping={true} scrollPastEnd={true} bind:editor bind:value/>
    </div>

    {/if}

</div>


<style>

    .toolbar-button:hover {
        border: 1px solid #ccc;
    }

    .toolbar-button-active {
        border: 1px solid #ccc;
    }

</style>