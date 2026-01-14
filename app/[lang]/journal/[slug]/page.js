import Link from 'next/link'
import JournalRenderer from '@/components/JournalRenderer'
import JournalLayout from '@/components/Journal/JournalLayout'
import JournalPostFooter from '@/components/Journal/JournalPostFooter'
import RelatedPosts from '@/components/Journal/RelatedPosts'
import { createClient } from '../../../../lib/supabase/server'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

const dictionaries = {
    en: () => import('../../../../i18n/en.json').then((module) => module.default),
    zh: () => import('../../../../i18n/zh.json').then((module) => module.default),
}

async function getDictionary(locale) {
    return dictionaries[locale]()
}

export default async function Article({ params, searchParams }) {
    const lang = params.lang || 'en'
    const slug = params.slug
    const dict = await getDictionary(lang)
    const isZh = lang === 'zh'

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    // 1. Fetch Current Post
    const { data: post } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single()

    if (!post) {
        notFound()
    }

    // 2. Fetch Helper Data (Nav & Related)
    const titleField = isZh ? 'title_zh' : 'title_en'

    // Prev: created_at BEFORE current
    let prevQuery = supabase
        .from('posts')
        .select(`title_en, title_zh, slug`)
        .lt('created_at', post.created_at)
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(1)

    if (isZh) prevQuery = prevQuery.not('title_zh', 'is', null)
    else prevQuery = prevQuery.not('title_en', 'is', null)

    const { data: prevPost } = await prevQuery.single()

    // Next: created_at AFTER current
    let nextQuery = supabase
        .from('posts')
        .select(`title_en, title_zh, slug`)
        .gt('created_at', post.created_at)
        .eq('published', true)
        .order('created_at', { ascending: true })
        .limit(1)

    if (isZh) nextQuery = nextQuery.not('title_zh', 'is', null)
    else nextQuery = nextQuery.not('title_en', 'is', null)

    const { data: nextPost } = await nextQuery.single()

    // Related: Matching tags or latest (excluding current)
    let relatedPosts = []
    if (post.tags && post.tags.length > 0) {
        let relatedQuery = supabase
            .from('posts')
            .select('id, title_en, title_zh, slug, image_url, created_at, category')
            .overlaps('tags', post.tags)
            .neq('id', post.id)
            .eq('published', true)
            .limit(4)

        if (isZh) relatedQuery = relatedQuery.not('title_zh', 'is', null)
        else relatedQuery = relatedQuery.not('title_en', 'is', null)

        const { data } = await relatedQuery
        relatedPosts = data || []
    }

    // Fallback if not enough related: Fetch latest
    if (relatedPosts.length < 2) {
        let latestQuery = supabase
            .from('posts')
            .select('id, title_en, title_zh, slug, image_url, created_at, category')
            .neq('id', post.id)
            .eq('published', true)
            .order('created_at', { ascending: false })
            .limit(4)

        if (isZh) latestQuery = latestQuery.not('title_zh', 'is', null)
        else latestQuery = latestQuery.not('title_en', 'is', null)

        const { data: latest } = await latestQuery

        // Merge and dedupe
        const existingIds = new Set(relatedPosts.map(p => p.id))
        if (latest) {
            latest.forEach(p => {
                if (!existingIds.has(p.id)) {
                    relatedPosts.push(p)
                }
            })
        }
        relatedPosts = relatedPosts.slice(0, 4)
    }


    // 3. Prepare Display Data
    const title = isZh && post.title_zh ? post.title_zh : post.title_en
    const content = isZh && post.content_zh ? post.content_zh : post.content_en

    const formatDate = (dateString) => {
        if (!dateString) return ''
        const date = new Date(dateString)
        // Monospace technical format
        return date.toISOString().split('T')[0]
    }

    // Default reading time if not set
    const readTime = post.reading_time || Math.ceil((content?.length || 0) / 1000)

    return (
        <div className="bg-paper min-h-screen">
            <div className="pt-32 pb-16">
                <JournalLayout>
                    {/* Back Link */}
                    <Link href={`/${lang}/journal`} className={`text-[10px] font-mono text-gray-400 hover:text-ink transition-colors mb-8 inline-block ${isZh ? 'tracking-normal' : 'tracking-[0.2em] uppercase'}`}>
                        ← {dict.journal.title}
                    </Link>

                    {/* Meta Header */}
                    <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-gray-400 mb-6 uppercase tracking-widest">
                        <span>{formatDate(post.created_at)}</span>
                        <span>/</span>
                        <span className="text-ink">{post.category || 'Stories'}</span>
                        {readTime > 0 && (
                            <>
                                <span>/</span>
                                <span>{readTime} MIN READ</span>
                            </>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className={`text-4xl md:text-5xl font-sans font-bold mb-8 leading-tight text-ink ${isZh ? 'tracking-normal' : 'tracking-tight'}`}>
                        {title}
                    </h1>
                </JournalLayout>

                {/* Hero Image */}
                {post.image_url && (
                    <JournalLayout className="mb-12">
                        <div className="w-full relative overflow-hidden bg-[#E8E6E0]">
                            <img src={post.image_url} alt={title} className="w-full h-auto block" />
                        </div>
                    </JournalLayout>
                )}

                {/* Content */}
                <JournalLayout>
                    <JournalRenderer content={content} slug={slug} forcedVariant={searchParams?.variant} />

                    {/* Footer Components */}
                    <JournalPostFooter
                        post={post}
                        prevPost={prevPost}
                        nextPost={nextPost}
                        dict={dict}
                    />
                </JournalLayout>

                {/* Related Posts (Redesigned) */}
                <RelatedPosts posts={relatedPosts} currentSlug={slug} lang={lang} />
            </div>
        </div>
    )
}
