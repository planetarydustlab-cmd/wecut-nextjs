import Link from 'next/link'

export default function RelatedPosts({ posts, currentSlug, lang }) {
    if (!posts || posts.length === 0) return null

    const isZh = lang === 'zh'
    const getTitle = (post) => (isZh && post.title_zh ? post.title_zh : post.title_en)

    // Industrial Date Format: 2024-02-14
    const formatDate = (dateString) => {
        if (!dateString) return ''
        return new Date(dateString).toISOString().split('T')[0]
    }

    return (
        <section className="bg-paper border-t border-line py-24 px-6 md:px-0">
            <div className="max-w-[1024px] mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-12 border-b border-line pb-4">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-gray-500">
                        {isZh ? '相關研究' : 'RELATED RESEARCH'}
                    </h3>
                    <span className="font-mono text-[10px] text-gray-400">INDEX: 001-004</span>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {posts.map((post, index) => (
                        <Link key={post.id} href={`/${lang}/journal/${post.slug}`} className="group block">
                            {/* Image Container 4:3 */}
                            <div className="aspect-[4/3] bg-concrete mb-4 overflow-hidden relative border border-transparent group-hover:border-ink transition-colors">
                                {post.image_url ? (
                                    <img
                                        src={post.image_url}
                                        alt={getTitle(post)}
                                        className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[10px] font-mono text-gray-400">
                                        NO_IMG
                                    </div>
                                )}
                            </div>

                            {/* Meta */}
                            <div className="flex justify-between items-center mb-2 border-b border-line/50 pb-2">
                                <span className="text-[9px] font-mono text-gray-400">APPX. {String(index + 1).padStart(2, '0')}</span>
                                <span className="text-[9px] font-mono text-gray-400">{formatDate(post.created_at)}</span>
                            </div>

                            {/* Title */}
                            <h4 className={`font-sans font-bold text-sm leading-tight text-ink group-hover:opacity-70 transition-opacity ${isZh ? 'tracking-normal' : 'tracking-tight'}`}>
                                {getTitle(post)}
                            </h4>

                            {/* Catgory */}
                            <p className="mt-2 text-[9px] font-mono text-gray-400 uppercase">
                                {post.category || 'NOTE'}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
