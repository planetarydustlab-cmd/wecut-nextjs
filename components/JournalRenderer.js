'use client'

import React, { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { parseEditorialContent } from '../lib/editorialParser'
import { TldrBox, NoteAside, PullQuote } from './Journal/EditorialComponents'

export default function JournalRenderer({ content, slug }) {
    // 1. Parse content into blocks
    const blocks = useMemo(() => parseEditorialContent(content), [content])

    return (
        <div className="journal-content-wrapper w-full">
            {blocks.map((block, index) => {
                // Unique Key is essential. Using index + type + snippet hash-ish
                const key = `${block.type}-${index}`

                switch (block.type) {
                    case 'tldr':
                        return (
                            <TldrBox key={key}>
                                {block.content}
                            </TldrBox>
                        )

                    case 'quote':
                        return (
                            <PullQuote key={key}>
                                {block.content}
                            </PullQuote>
                        )

                    case 'note':
                        // Handling Notes:
                        // OPTION A: Inline (simplest, robust)
                        // OPTION B: Sidebar. To do sidebar, the note technically needs to sit NEXT to content.
                        // But our blocks are sequential (Markdown -> Note -> Markdown).
                        // A true CSS Grid sidebar requires the Note to be a sibling of the content it annotates in a specific grid area.
                        // Given the sequential nature, the best approach for "Digital Brutalism" sidebar 
                        // is actually to render it inline on mobile, but on desktop, use:
                        // float: right; clear: right; width: 200px; margin-right: -240px;
                        // This pushes it into the right rail if the container allows overflow-x or has padding.
                        // BUT, our container is strict 720px safe zone.
                        // So, we need to break out of the 720px for the sidebar note.

                        // We will allow the NoteAside component to handle its positioning.
                        // We'll wrap it in a div that allows it to positioned.
                        return (
                            <div key={key} className="relative group">
                                <div className="md:absolute md:left-[105%] md:top-0 md:w-48 lg:w-56">
                                    <NoteAside>{block.content}</NoteAside>
                                </div>
                                {/* Mobile Fallback / Marker */}
                                <div className="md:hidden">
                                    <NoteAside>{block.content}</NoteAside>
                                </div>
                            </div>
                        )

                    case 'markdown':
                    default:
                        return (
                            <div key={key} className="journal-prose mb-8 last:mb-0">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        // Override basic elements for "Digital Brutalism" typography
                                        p: ({ children }) => (
                                            <p className="mb-6 font-sans text-[1.1rem] leading-[1.75] text-[#111] font-light">
                                                {children}
                                            </p>
                                        ),
                                        h2: ({ children }) => (
                                            <h2 className="mt-16 mb-8 font-sans font-bold text-3xl tracking-tight border-b border-gray-300 pb-4">
                                                {children}
                                            </h2>
                                        ),
                                        h3: ({ children }) => (
                                            <h3 className="mt-12 mb-6 font-mono uppercase tracking-widest text-sm font-bold bg-concrete inline-block px-2 py-1">
                                                {children}
                                            </h3>
                                        ),
                                        ul: ({ children }) => (
                                            <ul className="mb-8 pl-0 list-none space-y-2">
                                                {children}
                                            </ul>
                                        ),
                                        li: ({ children }) => (
                                            <li className="flex gap-4 font-sans text-[1.05rem]">
                                                <span className="text-gray-300 font-mono text-xs mt-1.5">01/</span>
                                                <span>{children}</span>
                                            </li>
                                        ),
                                        blockquote: ({ children }) => (
                                            <blockquote className="pl-6 border-l-2 border-ink my-8 italic text-lg text-gray-600">
                                                {children}
                                            </blockquote>
                                        ),
                                        strong: ({ children }) => (
                                            <strong className="font-bold text-ink">{children}</strong>
                                        ),
                                        a: ({ href, children }) => (
                                            <a href={href} className="underline decoration-1 underline-offset-4 decoration-gray-400 hover:decoration-ink transition-colors">
                                                {children}
                                            </a>
                                        ),
                                        img: ({ src, alt }) => (
                                            <figure className="my-12 w-full">
                                                <img src={src} alt={alt} className="w-full grayscale hover:grayscale-0 transition-all duration-700" />
                                                {alt && <figcaption className="mt-3 font-mono text-[9px] uppercase tracking-widest text-gray-400 text-center">{alt}</figcaption>}
                                            </figure>
                                        )
                                    }}
                                >
                                    {block.content}
                                </ReactMarkdown>
                            </div>
                        )
                }
            })}
        </div>
    )
}

