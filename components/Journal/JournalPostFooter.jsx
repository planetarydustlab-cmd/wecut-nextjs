'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function JournalPostFooter({ post, prevPost, nextPost, dict }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        const url = window.location.href
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: post.title_en,
                    text: post.title_en,
                    url: window.location.href,
                })
            } catch (err) {
                console.log('Share failed:', err)
            }
        } else {
            handleCopy()
        }
    }

    return (
        <footer className="mt-16 pt-16 border-t border-line">
            {/* Tags & Share */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
                <div className="flex flex-wrap gap-2">
                    {post.tags && post.tags.map(tag => (
                        <Link
                            key={tag}
                            href={`/en/journal/tag/${tag}`} // TODO: Handle lang dynamically if needed, defaulting to en for now or prop
                            className="text-[10px] font-mono border border-gray-200 px-3 py-1 uppercase hover:bg-ink hover:text-white transition-colors"
                        >
                            {tag}
                        </Link>
                    ))}
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={handleCopy}
                        className="text-[10px] font-mono uppercase hover:opacity-60 transition-opacity"
                    >
                        {copied ? 'Link Copied' : 'Copy Link'}
                    </button>
                    <button
                        onClick={handleShare}
                        className="text-[10px] font-mono uppercase hover:opacity-60 transition-opacity"
                    >
                        Share
                    </button>
                </div>
            </div>

            {/* Navigation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24">
                {/* PREVIOUS */}
                <div className="flex flex-col items-start text-left">
                    {prevPost ? (
                        <Link href={`/en/journal/${prevPost.slug}`} className="group block">
                            <span className="text-[10px] font-mono text-gray-400 mb-2 block uppercase tracking-widest">Previous Story</span>
                            <span className="font-serif italic text-2xl group-hover:opacity-60 transition-opacity">
                                {prevPost.title_en}
                            </span>
                        </Link>
                    ) : (
                        <div className="opacity-0" aria-hidden="true">Placeholder</div>
                    )}
                </div>

                {/* NEXT */}
                <div className="flex flex-col items-start md:items-end text-left md:text-right">
                    {nextPost ? (
                        <Link href={`/en/journal/${nextPost.slug}`} className="group block">
                            <span className="text-[10px] font-mono text-gray-400 mb-2 block uppercase tracking-widest">Next Story</span>
                            <span className="font-serif italic text-2xl group-hover:opacity-60 transition-opacity">
                                {nextPost.title_en}
                            </span>
                        </Link>
                    ) : (
                        <div className="opacity-0" aria-hidden="true">Placeholder</div>
                    )}
                </div>
            </div>
        </footer>
    )
}
