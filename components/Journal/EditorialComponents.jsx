import React from 'react'

export function TldrBox({ children }) {
    return (
        <div className="bg-ink text-paper p-8 mb-12 border border-ink">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] mb-4 text-gray-400 border-b border-gray-700 pb-2">
                Abstract / TL;DR
            </h3>
            <div className="font-serif italic text-xl md:text-2xl leading-relaxed">
                {children}
            </div>
        </div>
    )
}

export function NoteAside({ children }) {
    return (
        <aside className="my-8 md:my-0 p-6 bg-[#F5F5F3] border-l-2 border-ink md:border-l-0 md:bg-transparent md:p-0 md:border-b border-ink/20">
            <span className="block font-mono text-[9px] uppercase tracking-widest text-[#666] mb-2">Editor's Note</span>
            <div className="font-mono text-xs leading-relaxed text-[#444]">
                {children}
            </div>
        </aside>
    )
}

export function PullQuote({ children }) {
    return (
        <blockquote className="my-16 md:-mx-12 text-center">
            <p className="font-serif italic text-4xl md:text-5xl leading-tight text-ink">
                "{children}"
            </p>
        </blockquote>
    )
}
// Map Figure (Image + Caption)
// Map Figure (Image + Caption)
export function MapFigure({ url, caption }) {
    return (
        <figure className="my-24 w-full block clear-both relative">
            <div className="w-full border border-line p-1 bg-white">
                <div className="w-full relative overflow-hidden bg-concrete">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={url}
                        alt={caption || 'Map'}
                        className="w-full h-auto block"
                    />
                </div>
            </div>
            {caption && (
                <figcaption className="mt-4 flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-widest text-gray-500">
                    <span className="inline-block w-4 h-px bg-gray-400"></span>
                    POINT: {caption}
                </figcaption>
            )}
        </figure>
    )
}
