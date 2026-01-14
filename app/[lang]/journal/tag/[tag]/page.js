import Link from 'next/link'
import { createClient } from '../../../../../lib/supabase/server'
import { cookies } from 'next/headers'
import JournalLayout from '@/components/Journal/JournalLayout'

const dictionaries = {
    en: () => import('../../../../../i18n/en.json').then((module) => module.default),
    zh: () => import('../../../../../i18n/zh.json').then((module) => module.default),
}

async function getDictionary(locale) {
    return dictionaries[locale]()
}

export default async function TagPage({ params }) {
    const lang = params.lang || 'en'
    const tag = decodeURIComponent(params.tag)
    const dict = await getDictionary(lang)
    const isZh = lang === 'zh'

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    // Fetch posts containing the tag
    const { data: posts } = await supabase
        .from('posts')
        .select('*')
        .contains('tags', [tag])
        .eq('published', true)
        .order('created_at', { ascending: false })

    const formatDate = (dateString) => {
        if (!dateString) return ''
        const date = new Date(dateString)
        const month = date.toLocaleString(isZh ? 'zh-TW' : 'en-US', { month: 'short' }).toUpperCase()
        const year = date.getFullYear()
        return `${month} ${year}`
    }

    return (
        <div className="bg-paper min-h-screen pt-32 pb-16">
            <JournalLayout>
                <Link
                    href={`/${lang}/journal`}
                    className="text-[10px] font-mono text-gray-400 hover:text-ink transition-colors mb-8 inline-block uppercase tracking-[0.2em]"
                >
                    ← All Stories
                </Link>

                <h1 className="font-serif italic text-4xl md:text-5xl mb-4">
                    #{tag}
                </h1>
                <p className="font-mono text-xs text-gray-500 mb-16 uppercase tracking-widest">
                    {posts?.length || 0} Stories Found
                </p>

                <div className="grid grid-cols-1 gap-16">
                    {posts && posts.map(post => (
                        <Link key={post.id} href={`/${lang}/journal/${post.slug}`} className="group block">
                            <div className="aspect-[2/1] bg-[#E8E6E0] mb-6 overflow-hidden">
                                {post.image_url && (
                                    <img
                                        src={post.image_url}
                                        alt={post.title_en}
                                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                    />
                                )}
                            </div>
                            <div className="flex items-center gap-3 text-[10px] font-mono text-gray-400 mb-2 uppercase tracking-widest">
                                <span>{formatDate(post.created_at)}</span>
                                <span>/</span>
                                <span>{post.category || 'Stories'}</span>
                            </div>
                            <h2 className="font-serif italic text-3xl leading-tight group-hover:opacity-60 transition-opacity">
                                {post.title_en}
                            </h2>
                        </Link>
                    ))}

                    {params.tag === 'undefined' && (
                        <p className="text-red-500">Tag is undefined</p>
                    )}
                </div>
            </JournalLayout>
        </div>
    )
}
