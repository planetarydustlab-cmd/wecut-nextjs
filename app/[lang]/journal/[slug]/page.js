import Link from 'next/link'
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

export default async function Article({ params }) {
    const lang = params.lang || 'en'
    const slug = params.slug
    const dict = await getDictionary(lang)
    const isZh = lang === 'zh'

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data: post } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single()

    if (!post) {
        notFound()
    }

    const title = isZh && post.title_zh ? post.title_zh : post.title_en
    const content = isZh && post.content_zh ? post.content_zh : post.content_en

    const formatDate = (dateString) => {
        if (!dateString) return ''
        const date = new Date(dateString)
        const month = date.toLocaleString(isZh ? 'zh-TW' : 'en-US', { month: 'short' }).toUpperCase()
        const year = date.getFullYear()
        return `${month} ${year}`
    }

    return (
        <div className="bg-paper min-h-screen">
            <section className="pt-32 pb-16 px-6 max-w-4xl mx-auto">
                <Link href={`/${lang}/journal`} className={`text-[10px] font-mono text-gray-400 hover:text-ink transition-colors mb-8 inline-block ${isZh ? 'tracking-normal' : 'tracking-[0.2em] uppercase'}`}>
                    ← {dict.journal.title}
                </Link>

                <p className="text-[10px] font-mono text-gray-400 mb-6">STORIES / {formatDate(post.created_at)}</p>
                <h1 className={`text-4xl md:text-6xl font-serif italic mb-8 leading-tight ${isZh ? 'font-light' : 'font-normal'}`}>
                    {title}
                </h1>

                {post.image_url && (
                    <div className="aspect-video bg-[#E8E6E0] w-full mb-12 overflow-hidden">
                        <img src={post.image_url} alt={title} className="object-cover w-full h-full" />
                    </div>
                )}

                <div className="prose prose-sm md:prose-lg font-serif mx-auto text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {content}
                </div>
            </section>
        </div>
    )
}
