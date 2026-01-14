export function parseEditorialContent(content) {
    if (!content) return []

    // 1. Split by double newline to process paragraph chunks
    // This assumes users write tokens as separate paragraphs (which is standard practice for this requirement)
    // "NOTE: ..." usually stands alone.
    // 0. Normalize newlines
    const normalized = content.replace(/\\n/g, '\n').replace(/\r\n/g, '\n')

    // 1. Split by double newline to process paragraph chunks
    // Matches: newline, optional whitespace, newline (and any more newlines)
    const chunks = normalized.split(/\n\s*\n+/)

    const blocks = []

    chunks.forEach(chunk => {
        const trimmed = chunk.trim()

        // TL;DR Check
        if (trimmed.startsWith('TL;DR:')) {
            blocks.push({
                type: 'tldr',
                content: trimmed.replace(/^TL;DR:\s*/, '')
            })
            return
        }

        // NOTE Check
        if (trimmed.startsWith('NOTE:')) {
            blocks.push({
                type: 'note',
                content: trimmed.replace(/^NOTE:\s*/, '')
            })
            return
        }

        // QUOTE Check
        if (trimmed.startsWith('QUOTE:')) {
            blocks.push({
                type: 'quote',
                content: trimmed.replace(/^QUOTE:\s*/, '')
            })
            return
        }

        // MAP Check
        if (trimmed.startsWith('MAP:')) {
            const raw = trimmed.replace(/^MAP:\s*/, '')
            const [url, caption] = raw.split('|').map(s => s.trim())
            blocks.push({
                type: 'map',
                url: url,
                caption: caption || ''
            })
            return
        }

        // Otherwise: Standard Markdown
        // Optimization: Collapse sequential markdown blocks if needed?
        // Ideally, we want to run 'markdown' blocks together until interrupted, 
        // BUT for the Sidebar/Note layout, having granular blocks helps with placement.
        // However, splitting every paragraph might break lists or tables that use loose newlines.
        // Let's TRY merging sequential markdown blocks for smoother reading flow, changing only when a token hits.

        const lastBlock = blocks[blocks.length - 1]
        if (lastBlock && lastBlock.type === 'markdown') {
            lastBlock.content += '\n\n' + chunk
        } else {
            blocks.push({
                type: 'markdown',
                content: chunk
            })
        }
    })

    return blocks
}
