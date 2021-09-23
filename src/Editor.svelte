<script>

    // Depends on:
    // - codemirror


    //
    // CodeMirror 5 imports

    import CodeMirror from "codemirror"
    import "codemirror/lib/codemirror.css"


    //
    // CodeMirror 5 modes

    import "codemirror/mode/markdown/markdown"
    import "codemirror/mode/gfm/gfm"

    import "codemirror/mode/powershell/powershell"
    import "codemirror/mode/shell/shell"

    import "codemirror/mode/htmlmixed/htmlmixed"
    import "codemirror/mode/javascript/javascript"
    import "codemirror/mode/css/css"

    import "codemirror/mode/clike/clike"
    import "codemirror/mode/python/python"
    import "codemirror/mode/xml/xml"

    import "codemirror/mode/http/http"
    import "codemirror/mode/nginx/nginx"


    //
    // CodeMirror 5 addons

    import "codemirror/addon/display/fullscreen"
    import "codemirror/addon/display/fullscreen.css"
    import "codemirror/addon/display/placeholder"

    import "codemirror/addon/edit/matchbrackets"
    import "codemirror/addon/edit/closebrackets"
    import "codemirror/addon/edit/matchtags"
    import "codemirror/addon/edit/closetag"
    import "codemirror/addon/edit/trailingspace"
    import "codemirror/addon/edit/continuelist"

    import "codemirror/addon/selection/active-line"

    import "codemirror/addon/scroll/annotatescrollbar"
    import "codemirror/addon/scroll/simplescrollbars"
    import "codemirror/addon/scroll/simplescrollbars.css"
    import "codemirror/addon/scroll/scrollpastend"

    import "codemirror/addon/search/match-highlighter"
    import "codemirror/addon/search/searchcursor"


    //
    // Svelte imports

    import { onMount } from "svelte"
    import { CursorStore, EditorStore, TokenStore } from "./emdy-stores"


    //
    // Svelte component props

    export let autoFocus = false
    export let changeModeOnDragDrop = false
    export let fullScreen = false
    export let keyBindings = null
    export let lineNumbers = false
    export let lineWrapping = false
    export let placeholder = "Read the guide at https://www.markdownguide.org/basic-syntax/"
    export let scrollPastEnd = false
    export let spellCheck = false
    export let styleActiveLine = false
    export let tabSize = 4
    export let value = ""


    //
    // Svelte state variables

    export let editor = null
    let textarea = null


    //
    // Svelte life-cycle

    onMount(() => {

        editor = CodeMirror.fromTextArea(textarea, {
            autoCloseBrackets: true,
            autoCloseTags: true,
            autofocus: autoFocus,
            extraKeys: keyBindings,
            fullScreen: fullScreen,
            //highlightSelectionMatches: { annotateScrollbar: true, minChars: 1 },
            indentUnit: tabSize,
            lineNumbers: lineNumbers,
            lineWrapping: lineWrapping,
            matchBrackets: true,
            matchTags: true,
            mode: "gfm",
            placeholder: placeholder,
            scrollbarStyle: "overlay",
            scrollPastEnd: scrollPastEnd,
            showTrailingSpace: true,
            spellcheck: spellCheck,
            styleActiveLine: styleActiveLine,
            tabSize: tabSize,
            viewportMargin: Infinity,
        })

        editor.on("change", () => {
            value = editor.getValue()
        })

        editor.on("cursorActivity", () => {
            const doc = editor.getDoc()
            const cursor = doc.getCursor()
            const type = editor.getTokenTypeAt(cursor)
            const token = type ? type.split(" ") : []
            TokenStore.set(token)
            CursorStore.set(cursor)
        })

        editor.on("drop", async (_, event) => {
            const { dataTransfer: {items: {0: item}} } = event
            const mode = CodeMirror.findModeByMIME(item.type)
            if (changeModeOnDragDrop) {
                editor.setOption("mode", mode.mode)
            }
        })

        editor.setOption("value", value)
        EditorStore.set(editor)
    })

</script>


<svelte:head>

    <style>

        @import url('https://fonts.googleapis.com/css2?family=Fira+Code&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Fira+Sans&display=swap');

        .CodeMirror {
            cursor: text;
            font-family: 'Fira Code', monospace !important;
            height: 100%;
        }

        .CodeMirror-selection-highlight-scrollbar {
            background-color: lightgreen;
            height: auto;
        }

        .CodeMirror-placeholder {
            color: #999 !important;
        }

        .cm-trailingspace {
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QUXCToH00Y1UgAAACFJREFUCNdjPMDBUc/AwNDAAAFMTAwMDA0OP34wQgX/AQBYgwYEx4f9lQAAAABJRU5ErkJggg==);
            background-position: bottom left;
            background-repeat: repeat-x;
        }

        .cm-matchhighlight {
            background-color: lightgreen;
        }

        .cm-header { color: inherit !important; }
        .cm-header-1 { font-size: 1.6em; }
        .cm-header-2 { font-size: 1.5em; }
        .cm-header-3 { font-size: 1.4em; }
        .cm-header-4 { font-size: 1.3em; }
        .cm-header-5 { font-size: 1.2em; }
        .cm-header-6 { font-size: 1.1em; }

    </style>

</svelte:head>


<div id="editor-wrapper">
    <textarea bind:this={textarea} tabindex="-1"></textarea>
</div>


<style>

    #editor-wrapper {
        height: 100%;
        width: 100%;
        word-wrap: break-word;
    }

</style>