import Link from 'next/link'

export default function RelatedPosts({ posts, currentSlug }) {
    if (!posts || posts.length === 0) return null

    return (
        <section className="mt-24 pt-24 border-t border-ink/10 bg-gray-50 -mx-6 px-6 md:px-0">
            <div className="max-w-[720px] mx-auto pb-24">
                <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-12 text-center">Related Stories</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                    {posts.map(post => (
                        <Link key={post.id} href={`/en/journal/${post.slug}`} className="group block">
                            <div className="aspect-[3/2] bg-[#E8E6E0] mb-4 overflow-hidden">
                                {post.image_url && (
                                    <img
                                        src={post.image_url}
                                        alt={post.title_en}
                                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                    />
                                )}
                            </div>
                            <h4 className="font-serif italic text-xl leading-snug group-hover:opacity-60 transition-opacity">
                                {post.title_en}
                            </h4>
                            <p className="text-[10px] font-mono text-gray-400 mt-2">
                                {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
