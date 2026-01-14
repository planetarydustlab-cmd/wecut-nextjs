'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export default function JournalPostFooter({ post, prevPost, nextPost, dict }) {
    const [copied, setCopied] = useState(false)
    const pathname = usePathname()
    // Determine current locale purely from helper or path for client components if dict is missing deeper keys? 
    // Actually dict is passed from server component, so it's safe.

    // Strict I18N Accessors
    const t = (key) => dict?.journal_footer?.[key] || key

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
                    title: post.title_en, // TODO: Use localized title if available, but for sharing EN title is often safer or use current
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

    // Locale-aware Title Helper
    // We can infer locale from pathname or checks within dict, but better to check if title_zh exists?
    // Actually, prevPost/nextPost objects passed here ALREADY have strict locale filtering applied by server.
    // So we just render what we get. If prevPost is null, we show nothing (Strict Locale Wall).

    const getTitle = (p) => {
        // Since server strictly filters, the existing title field should be the one we want.
        // However, the queries return `title_en` and `title_zh`.
        // We need to know WHICH one to display.
        // Let's check if the current pathname includes '/zh/'.
        const isZh = pathname?.includes('/zh/')
        return isZh && p.title_zh ? p.title_zh : p.title_en
    }

    return (
        <footer className="mt-24 pt-12 border-t border-line">
            {/* Tags & Action Row */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-24">
                {/* Tags */}
                <div className="flex flex-col gap-4 max-w-md">
                    <span className="font-mono text-[10px] uppercase text-gray-400 tracking-widest">
                        Filed Under
                    </span>
                    <div className="flex flex-wrap gap-2">
                        {post.tags && post.tags.map(tag => (
                            <Link
                                key={tag}
                                href={`/${pathname?.split('/')[1] || 'en'}/journal/tag/${tag}`}
                                className="text-[10px] font-mono border border-line px-3 py-2 uppercase hover:bg-ink hover:text-paper transition-colors"
                            >
                                {tag}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-1">
                    <button
                        onClick={handleCopy}
                        className="group flex items-center gap-2 px-4 py-2 border border-transparent hover:border-line transition-colors"
                    >
                        <span className="w-2 h-2 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        <span className="text-[10px] font-mono uppercase tracking-widest">
                            {copied ? t('link_copied') : t('copy_link')}
                        </span>
                    </button>
                    <button
                        onClick={handleShare}
                        className="flex items-center gap-2 px-4 py-2 border border-transparent hover:border-line transition-colors"
                    >
                        <span className="text-[10px] font-mono uppercase tracking-widest">
                            {t('share')}
                        </span>
                    </button>
                </div>
            </div>

            {/* Navigation Grid (Strict Localized) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line">
                {/* PREVIOUS */}
                <div className="bg-paper p-8 md:p-12 hover:bg-concrete transition-colors group relative">
                    {prevPost ? (
                        <Link href={`/${pathname?.split('/')[1] || 'en'}/journal/${prevPost.slug}`} className="block h-full">
                            <span className="text-[10px] font-mono text-gray-400 mb-4 block uppercase tracking-widest">
                                ← {t('prev_story')}
                            </span>
                            <span className="font-sans font-bold text-2xl md:text-3xl leading-tight text-ink block group-hover:opacity-70 transition-opacity">
                                {getTitle(prevPost)}
                            </span>
                        </Link>
                    ) : (
                        <div className="h-full flex items-center justify-center">
                            <span className="font-mono text-[10px] text-gray-300 uppercase tracking-widest">
                                // END OF LOG
                            </span>
                        </div>
                    )}
                </div>

                {/* NEXT */}
                <div className="bg-paper p-8 md:p-12 hover:bg-concrete transition-colors group relative text-right">
                    {nextPost ? (
                        <Link href={`/${pathname?.split('/')[1] || 'en'}/journal/${nextPost.slug}`} className="block h-full">
                            <span className="text-[10px] font-mono text-gray-400 mb-4 block uppercase tracking-widest">
                                {t('next_story')} →
                            </span>
                            <span className="font-sans font-bold text-2xl md:text-3xl leading-tight text-ink block group-hover:opacity-70 transition-opacity">
                                {getTitle(nextPost)}
                            </span>
                        </Link>
                    ) : (
                        <div className="h-full flex items-center justify-center">
                            <span className="font-mono text-[10px] text-gray-300 uppercase tracking-widest">
                                // CURRENT HEAD
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </footer>
    )
}
