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
    // Prev: created_at BEFORE current
    const { data: prevPost } = await supabase
        .from('posts')
        .select('title_en, slug')
        .lt('created_at', post.created_at)
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

    // Next: created_at AFTER current
    const { data: nextPost } = await supabase
        .from('posts')
        .select('title_en, slug')
        .gt('created_at', post.created_at)
        .eq('published', true)
        .order('created_at', { ascending: true })
        .limit(1)
        .single()

    // Related: Matching tags or latest (excluding current)
    let relatedPosts = []
    if (post.tags && post.tags.length > 0) {
        // Tag overlap (postgres array overlap operator &&)
        const { data } = await supabase
            .from('posts')
            .select('id, title_en, slug, image_url, created_at')
            .overlaps('tags', post.tags)
            .neq('id', post.id)
            .eq('published', true)
            .limit(4)
        relatedPosts = data || []
    }

    // Fallback if not enough related: Fetch latest
    if (relatedPosts.length < 2) {
        const { data: latest } = await supabase
            .from('posts')
            .select('id, title_en, slug, image_url, created_at')
            .neq('id', post.id)
            .eq('published', true)
            .order('created_at', { ascending: false })
            .limit(4)

        // Merge and dedupe
        const existingIds = new Set(relatedPosts.map(p => p.id))
        latest.forEach(p => {
            if (!existingIds.has(p.id)) {
                relatedPosts.push(p)
            }
        })
        relatedPosts = relatedPosts.slice(0, 4)
    }


    // 3. Prepare Display Data
    const title = isZh && post.title_zh ? post.title_zh : post.title_en
    const content = isZh && post.content_zh ? post.content_zh : post.content_en

    const formatDate = (dateString) => {
        if (!dateString) return ''
        const date = new Date(dateString)
        const month = date.toLocaleString(isZh ? 'zh-TW' : 'en-US', { month: 'short' }).toUpperCase()
        const year = date.getFullYear()
        return `${month} ${year}`
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
                    <h1 className={`text-4xl md:text-5xl font-serif italic mb-8 leading-tight ${isZh ? 'font-light' : 'font-normal'}`}>
                        {title}
                    </h1>
                </JournalLayout>

                {/* Hero Image - Keep it slightly wider? Or strictly 720? 
                    User requested "Base: centered column, max-width 720–760px". 
                    Usually images allow break-out. Let's keep image 100% of container (720px) for now per strict rule.
                */}
                {post.image_url && (
                    <JournalLayout className="mb-12">
                        <div className="aspect-video bg-[#E8E6E0] w-full overflow-hidden">
                            <img src={post.image_url} alt={title} className="object-cover w-full h-full" />
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

                {/* Related Posts (Full Width Background but Centered Content) */}
                <RelatedPosts posts={relatedPosts} currentSlug={slug} />
            </div>
        </div>
    )
}
