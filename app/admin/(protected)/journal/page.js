'use client'

import { useEffect, useState } from 'react'
import { createClient } from '../../../../lib/supabase/client'
import Link from 'next/link'

export default function JournalList() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false })

        if (data) setPosts(data)
        setLoading(false)
    }

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this post?')) return

        const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', id)

        if (error) {
            alert('Error: ' + error.message)
        } else {
            fetchPosts()
        }
    }

    if (loading) return <div className="p-12 text-xs font-mono">LOADING JOURNAL...</div>

    return (
        <div>
            <div className="flex justify-between items-center mb-12">
                <div>
                    <h2 className="font-serif italic text-3xl">Journal</h2>
                    <p className="font-mono text-[10px] text-gray-400 mt-2 uppercase tracking-widest">Stories & Editorials</p>
                </div>
                <Link
                    href="/admin/journal/new"
                    className="bg-ink text-paper px-6 py-3 text-xs font-mono uppercase tracking-[0.2em] hover:opacity-90"
                >
                    Write Story +
                </Link>
            </div>

            <div className="bg-white border border-line">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-line bg-gray-50">
                            <th className="p-4 text-[10px] font-mono uppercase tracking-widest text-gray-400">Date</th>
                            <th className="p-4 text-[10px] font-mono uppercase tracking-widest text-gray-400">Title</th>
                            <th className="p-4 text-[10px] font-mono uppercase tracking-widest text-gray-400">Status</th>
                            <th className="p-4 text-[10px] font-mono uppercase tracking-widest text-gray-400">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                        {posts.map((post) => (
                            <tr key={post.id} className="hover:bg-gray-50 group">
                                <td className="p-4 font-mono text-xs">{new Date(post.created_at).toLocaleDateString()}</td>
                                <td className="p-4 font-serif text-lg">{post.title_en}</td>
                                <td className="p-4 font-mono text-xs">
                                    <span className={`px-2 py-1 rounded-full ${post.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                                        {post.published ? 'PUBLISHED' : 'DRAFT'}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex gap-4">
                                        <Link
                                            href={`/admin/journal/${post.id}`}
                                            className="text-[10px] font-mono uppercase tracking-widest text-ink hover:underline"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className="text-[10px] font-mono uppercase tracking-widest text-red-400 hover:text-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {posts.length === 0 && (
                    <div className="p-12 text-center font-mono text-xs text-gray-400">NO STORIES YET</div>
                )}
            </div>
        </div>
    )
}
