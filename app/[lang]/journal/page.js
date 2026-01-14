import Link from 'next/link'
import { createClient } from '../../../lib/supabase/server'
import { cookies } from 'next/headers'

const dictionaries = {
    en: () => import('../../../i18n/en.json').then((module) => module.default),
    zh: () => import('../../../i18n/zh.json').then((module) => module.default),
}

async function getDictionary(locale) {
    return dictionaries[locale]()
}

export default async function Journal({ params }) {
    const lang = params.lang || 'en'
    const dict = await getDictionary(lang)
    const isZh = lang === 'zh'

    // Setup Supabase and fetch posts
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    // Fetch published posts with strict locale filtering
    let query = supabase
        .from('posts')
        .select('id, title_en, title_zh, slug, content_en, content_zh, image_url, created_at, published, category, reading_time, tags')
        .eq('published', true)
        .order('created_at', { ascending: false })

    // STRICT LOCALE FILTERING
    if (isZh) {
        query = query.not('title_zh', 'is', null)
    } else {
        query = query.not('title_en', 'is', null)
    }

    const { data: posts } = await query

    // Helper functions
    const formatDate = (dateString) => {
        if (!dateString) return ''
        // Return strict ISO-like format: 2026-01-14
        const date = new Date(dateString)
        return date.toISOString().split('T')[0]
    }

    const getTitle = (post) => (isZh && post.title_zh ? post.title_zh : post.title_en)

    const getExcerpt = (post) => {
        const content = isZh && post.content_zh ? post.content_zh : post.content_en
        if (!content) return ''
        // Strip Markdown and Editorial Tokens (TL;DR:, NOTE:, QUOTE:)
        let plainText = content
            .replace(/^TL;DR:.*$/gm, '') // Remove TL;DR lines
            .replace(/^NOTE:.*$/gm, '') // Remove NOTE lines
            .replace(/^QUOTE:.*$/gm, '') // Remove QUOTE lines
            .replace(/[#*>\-_`\[\]()]/g, '') // Remove Markdown syntax
            .replace(/\n\s*\n/g, ' ') // Collapse newlines
            .trim()

        return plainText.slice(0, 150) + (plainText.length > 150 ? '...' : '')
    }

    const formatSerial = (index) => {
        // Newest post = Highest Number (e.g. Total 3 posts: Index 0 => #3, Index 1 => #2...)
        const serial = posts.length - index
        return `NO. ${serial.toString().padStart(3, '0')}`
    }

    return (
        <div className="bg-paper min-h-screen">
            {/* ARCHIVE HEADER */}
            {/* Restored Clean White Header implicitly via bg-paper */}
            <section className="pt-32 pb-16 px-6 border-b border-line">
                <div className="max-w-[720px] mx-auto text-center">
                    <p className="text-xs font-mono text-gray-500 mb-4 tracking-widest uppercase">
                        {dict.journal.subtitle || 'WECUT RESEARCH ARCHIVE'}
                    </p>
                    <h1 className={`text-4xl md:text-5xl font-sans font-bold tracking-tight mb-8 text-ink leading-none ${isZh ? 'font-light' : ''}`}>
                        {dict.journal.title || 'Journal'}
                    </h1>
                </div>
            </section>

            {/* ARCHIVE LIST (SPLIT ROW) */}
            <section className="max-w-[1024px] mx-auto px-6 pb-32">
                {posts && posts.length > 0 ? (
                    <div className="flex flex-col">
                        {posts.map((post, index) => (
                            <article key={post.id} className="group border-b border-line py-12 md:py-16">
                                <Link href={`/${lang}/journal/${post.slug}`} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

                                    {/* LEFT: IMAGE (4:3) */}
                                    <div className="md:col-span-5 order-2 md:order-1">
                                        {post.image_url ? (
                                            <div className="w-full relative overflow-hidden bg-concrete">
                                                <img
                                                    src={post.image_url}
                                                    alt={getTitle(post)}
                                                    className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-700"
                                                />
                                            </div>
                                        ) : (
                                            <div className="aspect-[4/3] bg-concrete w-full relative overflow-hidden">
                                                <div className="w-full h-full flex items-center justify-center bg-[#E5E5E5] text-gray-400 font-mono text-xs tracking-widest">
                                                    // NO_IMAGE_DATA //
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* RIGHT: CONTENT */}
                                    <div className="md:col-span-7 order-1 md:order-2 flex flex-col h-full justify-between">
                                        <div>
                                            {/* SERIAL & META */}
                                            <div className="flex justify-between items-baseline border-b border-line/50 pb-4 mb-6">
                                                <span className="font-mono text-xs text-gray-400">{formatSerial(index)}</span>
                                                <span className="font-mono text-xs text-gray-400 uppercase">
                                                    LAB NOTES / {formatDate(post.created_at)}
                                                </span>
                                            </div>

                                            {/* TITLE */}
                                            <h2 className={`text-2xl md:text-3xl font-sans font-bold leading-tight mb-4 group-hover:opacity-70 transition-opacity text-ink ${isZh ? 'tracking-normal' : 'tracking-tight'}`}>
                                                {getTitle(post)}
                                            </h2>

                                            {/* CATEGORY & TAGS */}
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                <span className="text-[10px] font-mono uppercase bg-concrete px-2 py-1 text-ink/70">
                                                    {post.category || 'UNCATEGORIZED'}
                                                </span>
                                                {post.tags && post.tags.map(tag => (
                                                    <span key={tag} className="text-[10px] font-mono uppercase border border-line px-2 py-1 text-gray-500">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* EXCERPT */}
                                            <p className={`text-sm text-gray-600 leading-relaxed font-serif line-clamp-2 max-w-md ${isZh ? 'font-light' : 'font-normal'}`}>
                                                {getExcerpt(post)}
                                            </p>
                                        </div>

                                        {/* ACTION */}
                                        <div className="mt-8 md:mt-12 text-right">
                                            <span className="font-mono text-[10px] uppercase tracking-widest hover:bg-ink hover:text-paper px-3 py-2 transition-colors inline-block border border-transparent hover:border-black">
                                                [ READ_ENTRY ]
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="py-32 text-center text-gray-400 font-mono text-sm border-b border-line">
                        // ARCHIVE EMPTY //
                    </div>
                )}
            </section>
        </div>
    )
}
