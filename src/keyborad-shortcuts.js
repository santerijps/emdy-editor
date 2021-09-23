import ToolbarButtons from "./toolbar-buttons"


export async function handleKeyboardShortcuts(event) {
    if (event.ctrlKey && event.altKey) {
        switch (event.key) {
            case "q":
                event.preventDefault()
                return ToolbarButtons.insertQuote()
            case "c":
                event.preventDefault()
                return ToolbarButtons.insertCode()
            case "h":
                event.preventDefault()
                return ToolbarButtons.insertHeading()
            case "b":
                event.preventDefault()
                return ToolbarButtons.insertBold()
            case "i":
                event.preventDefault()
                return ToolbarButtons.insertItalic()
            case "l":
                event.preventDefault()
                return ToolbarButtons.insertLink()
            case "p":
                event.preventDefault()
                return ToolbarButtons.insertImage()
            case "F9":
                return await ToolbarButtons.togglePreview()
            case "F10":
                return await ToolbarButtons.toggleSideBySide()
            default:
                return
        }
    }
}