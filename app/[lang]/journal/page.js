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

    // Fetch published posts
    // Note: We're not fetching author info yet as it requires public profile access policy
    const { data: posts } = await supabase
        .from('posts')
        .select('id, title_en, title_zh, slug, content_en, content_zh, image_url, created_at, published')
        .eq('published', true)
        .order('created_at', { ascending: false })

    // Determine Featured (Newest) & Recents
    const featuredPost = posts && posts.length > 0 ? posts[0] : null
    const recentPosts = posts && posts.length > 1 ? posts.slice(1) : []

    // Helper functions
    const formatDate = (dateString) => {
        if (!dateString) return ''
        const date = new Date(dateString)
        const month = date.toLocaleString(isZh ? 'zh-TW' : 'en-US', { month: 'short' }).toUpperCase()
        const year = date.getFullYear()
        return `${month} ${year}`
    }

    const getTitle = (post) => (isZh && post.title_zh ? post.title_zh : post.title_en)

    const getExcerpt = (post) => {
        // Strip HTML/Markdown if necessary, but assuming plain text/simple HTML for now. 
        // A robust solution would strip tags. For now, simple slice.
        const content = isZh && post.content_zh ? post.content_zh : post.content_en
        if (!content) return ''
        // Simple tag stripping regex
        const plainText = content.replace(/<[^>]+>/g, '')
        return plainText.slice(0, 150) + (plainText.length > 150 ? '...' : '')
    }

    return (
        <div className="bg-paper min-h-screen">
            {/* HEADER */}
            <section className="pt-24 pb-16 px-6 border-b border-line">
                <div className="max-w-6xl mx-auto">
                    <p className={`text-[10px] font-mono text-gray-500 mb-4 ${isZh ? 'tracking-normal' : 'tracking-[0.4em] uppercase'}`}>
                        {dict.journal.subtitle}
                    </p>
                    <h1 className={`text-5xl md:text-7xl font-serif italic mb-8 ${isZh ? 'font-light' : 'font-normal'}`}>
                        {dict.journal.title}
                    </h1>

                    {/* SUB-NAV */}
                    <div className={`flex space-x-8 text-xs font-sans ${isZh ? 'tracking-normal' : 'tracking-widest uppercase'}`}>
                        <Link href={`/${lang}/journal/careers`} className="hover:opacity-60 transition-opacity border-b border-transparent hover:border-ink pb-1">
                            {dict.journal.careers}
                        </Link>
                    </div>
                </div>
            </section>

            {/* FEATURED ARTICLE */}
            {featuredPost ? (
                <section className="max-w-6xl mx-auto px-6 py-16 border-b border-line">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="aspect-[4/3] bg-[#E8E6E0] w-full relative overflow-hidden group">
                            {featuredPost.image_url && (
                                <Link href={`/${lang}/journal/${featuredPost.slug}`}>
                                    <img
                                        src={featuredPost.image_url}
                                        alt={getTitle(featuredPost)}
                                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                    />
                                </Link>
                            )}
                        </div>
                        <div>
                            <p className="text-[10px] font-mono text-gray-400 mb-4">LATEST / {formatDate(featuredPost.created_at)}</p>
                            <h2 className={`text-3xl md:text-4xl font-serif italic mb-6 leading-tight ${isZh ? 'font-light' : 'font-normal'}`}>
                                <Link href={`/${lang}/journal/${featuredPost.slug}`} className="hover:opacity-70 transition-opacity">
                                    {getTitle(featuredPost)}
                                </Link>
                            </h2>
                            <p className={`text-sm text-gray-600 mb-8 leading-relaxed max-w-md ${isZh ? 'font-light' : 'font-normal'}`}>
                                {getExcerpt(featuredPost)}
                            </p>
                            <Link href={`/${lang}/journal/${featuredPost.slug}`} className={`text-[10px] underline underline-offset-4 hover:opacity-60 transition-opacity ${isZh ? 'tracking-normal' : 'tracking-[0.2em] uppercase'}`}>
                                {dict.journal.read_more}
                            </Link>
                        </div>
                    </div>
                </section>
            ) : (
                <section className="max-w-6xl mx-auto px-6 py-32 text-center text-gray-400 font-mono text-sm">
                    NO STORIES PUBLISHED YET
                </section>
            )}

            {/* RECENT ARTICLES GRID */}
            {recentPosts.length > 0 && (
                <section className="max-w-6xl mx-auto px-6 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
                        {recentPosts.map((post) => (
                            <Link href={`/${lang}/journal/${post.slug}`} key={post.id} className="group cursor-pointer block">
                                <div className="aspect-[3/4] bg-[#E8E6E0] mb-6 transition-opacity hover:opacity-90 overflow-hidden relative">
                                    {post.image_url && (
                                        <img
                                            src={post.image_url}
                                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                            alt={getTitle(post)}
                                        />
                                    )}
                                </div>
                                <p className="text-[10px] font-mono text-gray-400 mb-2">STORIES / {formatDate(post.created_at)}</p>
                                <h3 className={`text-xl font-serif italic mb-3 leading-snug ${isZh ? 'font-light' : 'font-normal'}`}>
                                    {getTitle(post)}
                                </h3>
                                <div className={`text-[10px] hover:opacity-60 transition-opacity ${isZh ? 'tracking-normal' : 'tracking-[0.2em] uppercase'}`}>
                                    {dict.journal.read_more}
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}
