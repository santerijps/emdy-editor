<script>

    //
    // marked

    import marked from "marked"


    //
    // Prism core

    import Prism from "prismjs"
    import "prismjs/themes/prism-coy.css"

    //
    // Prism plugins

    import "prismjs/plugins/line-numbers/prism-line-numbers"
    import "prismjs/plugins/line-numbers/prism-line-numbers.css"
    import "prismjs/plugins/toolbar/prism-toolbar"
    import "prismjs/plugins/toolbar/prism-toolbar.css"
    import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard"


    //
    // Prism languages

    import "prismjs/components/prism-c"
    import "prismjs/components/prism-clike"
    import "prismjs/components/prism-cpp"
    import "prismjs/components/prism-csharp"
    import "prismjs/components/prism-python"
    import "prismjs/components/prism-java"
    import "prismjs/components/prism-typescript"
    import "prismjs/components/prism-jsx"
    import "prismjs/components/prism-tsx"
    import "prismjs/components/prism-latex"
    import "prismjs/components/prism-markdown"
    import "prismjs/components/prism-makefile"
    import "prismjs/components/prism-shell-session"
    import "prismjs/components/prism-bash"
    import "prismjs/components/prism-sql"
    import "prismjs/components/prism-yaml"
    import "prismjs/components/prism-json"
    import "prismjs/components/prism-http"
    import "prismjs/components/prism-nginx"


    //
    // Svelte

    import { afterUpdate } from "svelte"


    //
    // State variables

    export let placeholder = ""
    export let value = ""
    $: html = marked(value)


    //
    // Life-cycle functions

    afterUpdate(() => {
        Prism.highlightAll()
    })


    //
    // Configure the marked renderer.
    // Set links to be opened in a new tab.
    // Set images have a max width of 100%.

    const renderer = {
        image: (href, title, text) => {
            return `<img src="${href}" alt="${text || title}" title=${title || text} style="max-width: 100%;"/>`
        },
        link: (href, title, text) => {
            return `<a href="${href}" title="${title ?? text}" target="_blank">${text}</a>`
        },
    }

    marked.use({ renderer, breaks: true, gfm: true })

</script>


<svelte:head>

    <style>

        @import url('https://fonts.googleapis.com/css2?family=Fira+Code&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Fira+Sans&display=swap');

        code {
            background-color: rgb(237, 235, 235);
            font-family: 'Fira Code', monospace !important;
            padding: 0.2em;
        }

        .copy-to-clipboard-button {
            cursor: pointer;
        }

        .code-toolbar {
            margin-bottom: 1.5em;
        }

        pre.line-numbers {
            margin-bottom: 1em;
        }

        pre.line-numbers > code {
            outline: none;
            padding-bottom: 0.5em;
            padding-top: 0.5em;
        }

        .line-numbers-rows {
            padding-top: 0.5em;
        }

        p {
            text-align: justify;
        }

    </style>

</svelte:head>


<div class="line-numbers">
    {#if html}
    {@html html}
    {:else}
    {placeholder}
    {/if}
</div>


<style>

    div {
        font-family:'Fira Sans', sans-serif;
        width: 100%;
        word-wrap: break-word;
    }

</style>