'use client'

import { useEffect, useState } from 'react'
import { createClient } from '../../../../../lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function PostEditor({ params }) {
    const { id } = params
    const isNew = id === 'new'
    const router = useRouter()
    const supabase = createClient()

    const [loading, setLoading] = useState(!isNew)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        title_en: '',
        title_zh: '',
        slug: '',
        content_en: '',
        content_zh: '',
        image_url: '',
        published: false
    })

    useEffect(() => {
        if (!isNew) {
            fetchPost()
        }
    }, [id])

    const fetchPost = async () => {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('id', id)
            .single()

        if (data) {
            setFormData(data)
        }
        setLoading(false)
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        setSaving(true)
        const fileExt = file.name.split('.').pop()
        const fileName = `journal_${Math.random()}.${fileExt}` // Prefix for journal
        const filePath = `${fileName}`

        // Reusing 'products' bucket for simplicity or create 'journal' bucket?
        // Plan didn't specify. I'll use 'products' bucket for now as it's set up,
        // or assumes 'images' bucket. I'll use 'products' (maybe rename bucket idea later to 'assets').
        // Actually, bucket 'products' policies allow admin write. So it safely stores files.
        // File path organization helps.

        const { error: uploadError } = await supabase.storage
            .from('products')
            .upload(filePath, file)

        if (uploadError) {
            alert('Upload failed: ' + uploadError.message)
            setSaving(false)
            return
        }

        const { data: { publicUrl } } = supabase.storage
            .from('products')
            .getPublicUrl(filePath)

        setFormData(prev => ({ ...prev, image_url: publicUrl }))
        setSaving(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)

        // Slug generation and sanitization
        let slugToSave = formData.slug || formData.title_en || ''
        slugToSave = slugToSave
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '') // Remove special chars
            .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
            .replace(/^-+|-+$/g, '')  // Remove leading/trailing hyphens

        const dataToSave = { ...formData, slug: slugToSave }

        let error
        if (isNew) {
            const { error: insertError } = await supabase
                .from('posts')
                .insert([dataToSave])
            error = insertError
        } else {
            const { error: updateError } = await supabase
                .from('posts')
                .update(dataToSave)
                .eq('id', id)
            error = updateError
        }

        if (error) {
            alert('Error saving: ' + error.message)
            setSaving(false)
        } else {
            router.push('/admin/journal')
            router.refresh()
        }
    }

    if (loading) return <div className="p-12 text-xs font-mono">LOADING STORY...</div>

    return (
        <div className="max-w-4xl">
            <div className="flex justify-between items-center mb-12">
                <div>
                    <Link href="/admin/journal" className="text-[10px] font-mono text-gray-400 hover:text-ink mb-2 block">← BACK TO LIST</Link>
                    <h2 className="font-serif italic text-3xl">{isNew ? 'New Story' : 'Edit Story'}</h2>
                </div>
                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="published"
                            checked={formData.published}
                            onChange={handleChange}
                            className="w-4 h-4 accent-ink"
                        />
                        <span className="text-xs font-mono uppercase tracking-widest">{formData.published ? 'Published' : 'Draft'}</span>
                    </label>
                    <button
                        onClick={handleSubmit}
                        disabled={saving}
                        className="bg-ink text-paper px-8 py-3 text-xs font-mono uppercase tracking-[0.2em] hover:opacity-90 disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : 'Save Story'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="md:col-span-2 space-y-8 bg-white p-8 border border-line">
                    <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Title (EN)</label>
                        <input name="title_en" value={formData.title_en || ''} onChange={handleChange} className="w-full border-b border-line py-2 text-xl font-serif italic focus:outline-none focus:border-ink" placeholder="The Art of Balance" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Title (ZH)</label>
                        <input name="title_zh" value={formData.title_zh || ''} onChange={handleChange} className="w-full border-b border-line py-2 text-lg font-serif focus:outline-none focus:border-ink" placeholder="平衡的藝術" />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Content (EN) - Markdown Supported</label>
                        <textarea name="content_en" value={formData.content_en || ''} onChange={handleChange} className="w-full border border-line p-4 text-sm font-sans focus:outline-none focus:border-ink h-64" placeholder="# Chapter 1..." />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Content (ZH)</label>
                        <textarea name="content_zh" value={formData.content_zh || ''} onChange={handleChange} className="w-full border border-line p-4 text-sm font-sans focus:outline-none focus:border-ink h-64" />
                    </div>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-8">
                    <div className="bg-white p-6 border border-line space-y-4">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-4">Meta</h3>
                        <div className="space-y-1">
                            <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Slug</label>
                            <input name="slug" value={formData.slug || ''} onChange={handleChange} className="w-full border-b border-line py-2 text-xs font-mono focus:outline-none focus:border-ink" placeholder="auto-generated" />
                            <p className="text-[10px] text-gray-400">URL friendly ID.</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 border border-line space-y-4">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-4">Featured Image</h3>
                        <div className="aspect-video bg-gray-100 border border-line flex items-center justify-center overflow-hidden mb-4">
                            {formData.image_url ? (
                                <img src={formData.image_url} alt="Cover" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-[10px] text-gray-400">NO IMAGE</span>
                            )}
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="block w-full text-[10px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-gray-100 file:text-ink hover:file:bg-gray-200 cursor-pointer"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
