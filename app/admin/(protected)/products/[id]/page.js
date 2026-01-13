'use client'

import { useEffect, useState } from 'react'
import { createClient } from '../../../../../lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ProductEditor({ params }) {
    const { id } = params
    const isNew = id === 'new'
    const router = useRouter()
    const supabase = createClient()

    const [loading, setLoading] = useState(!isNew)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        name_en: '',
        name_zh: '',
        formula_id: '',
        volume: '',
        scent_profile_en: '',
        scent_profile_zh: '',
        description_en: '',
        description_zh: '',
        price_twd: '',
        compare_at_price_twd: '',
        inventory_count: 0,
        low_stock_threshold: 5,
        category: '',
        tags: [],
        weight_g: '',
        dimensions: { length: 0, width: 0, height: 0 },
        price_id_tw_test: '', // Keeping it simple for now, mapping existing schema
        price_id_au_test: '',
        image_url: ''
    })

    useEffect(() => {
        if (!isNew) {
            fetchProduct()
        }
    }, [id])

    const fetchProduct = async () => {
        const { data, error } = await supabase
            .from('product_pages')
            .select('*')
            .eq('id', id)
            .single()

        if (data) {
            setFormData(data)
        }
        setLoading(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        setSaving(true) // Show loading state on save button or generally
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${fileName}`

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

        let error
        if (isNew) {
            const { error: insertError } = await supabase
                .from('product_pages')
                .insert([formData])
            error = insertError
        } else {
            const { error: updateError } = await supabase
                .from('product_pages')
                .update(formData)
                .eq('id', id)
            error = updateError
        }

        if (error) {
            alert('Error saving: ' + error.message)
            setSaving(false)
        } else {
            router.push('/admin/products')
            router.refresh()
        }
    }

    if (loading) return <div className="p-12 text-xs font-mono">LOADING FORMULA...</div>

    return (
        <div className="max-w-2xl">
            <div className="flex justify-between items-center mb-12">
                <div>
                    <Link href="/admin/products" className="text-[10px] font-mono text-gray-400 hover:text-ink mb-2 block">← BACK TO LIST</Link>
                    <h2 className="font-serif italic text-3xl">{isNew ? 'New Formulation' : 'Edit Formulation'}</h2>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 border border-line">

                {/* Image Upload */}
                <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Product Image</label>
                    <div className="flex items-start gap-6">
                        <div className="w-32 h-32 bg-gray-100 border border-line flex items-center justify-center overflow-hidden">
                            {formData.image_url ? (
                                <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-[10px] text-gray-400">NO IMAGE</span>
                            )}
                        </div>
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="block w-full text-[10px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-gray-100 file:text-ink hover:file:bg-gray-200 cursor-pointer"
                            />
                            <p className="text-[10px] text-gray-400 mt-2">Recommended: 1:1 Aspect Ratio (Square), PNG/JPG.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Formula ID</label>
                        <input name="formula_id" value={formData.formula_id || ''} onChange={handleChange} className="w-full border-b border-line py-2 text-sm focus:outline-none focus:border-ink" placeholder="SH-01" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Volume</label>
                        <input name="volume" value={formData.volume || ''} onChange={handleChange} className="w-full border-b border-line py-2 text-sm focus:outline-none focus:border-ink" placeholder="500ml" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Name (EN)</label>
                        <input name="name_en" value={formData.name_en || ''} onChange={handleChange} className="w-full border-b border-line py-2 text-sm focus:outline-none focus:border-ink" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Name (ZH)</label>
                        <input name="name_zh" value={formData.name_zh || ''} onChange={handleChange} className="w-full border-b border-line py-2 text-sm focus:outline-none focus:border-ink" />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Scent Profile (EN)</label>
                    <textarea name="scent_profile_en" value={formData.scent_profile_en || ''} onChange={handleChange} className="w-full border border-line p-3 text-sm focus:outline-none focus:border-ink h-20" />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Scent Profile (ZH)</label>
                    <textarea name="scent_profile_zh" value={formData.scent_profile_zh || ''} onChange={handleChange} className="w-full border border-line p-3 text-sm focus:outline-none focus:border-ink h-20" />
                </div>

                {/* INVENTORY & PRICING */}
                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-line border-dashed">
                    <div className="space-y-4">
                        <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-ink border-b border-line pb-2 mb-4">Inventory</h3>

                        <div className="space-y-1">
                            <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Stock Count</label>
                            <input type="number" name="inventory_count" value={formData.inventory_count} onChange={handleChange} className="w-full border-b border-line py-2 text-sm focus:outline-none focus:border-ink" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Low Stock Alert (Threshold)</label>
                            <input type="number" name="low_stock_threshold" value={formData.low_stock_threshold} onChange={handleChange} className="w-full border-b border-line py-2 text-sm focus:outline-none focus:border-ink" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-ink border-b border-line pb-2 mb-4">Pricing (TWD)</h3>

                        <div className="space-y-1">
                            <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Price ($)</label>
                            <input type="number" name="price_twd" value={formData.price_twd || ''} onChange={handleChange} className="w-full border-b border-line py-2 text-sm focus:outline-none focus:border-ink" placeholder="1280" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Compare At ($)</label>
                            <input type="number" name="compare_at_price_twd" value={formData.compare_at_price_twd || ''} onChange={handleChange} className="w-full border-b border-line py-2 text-sm focus:outline-none focus:border-ink text-gray-400" placeholder="Optional" />
                        </div>
                    </div>
                </div>

                {/* LOGISTICS & ORGANIZATION */}
                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-line border-dashed">
                    <div className="space-y-4">
                        <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-ink border-b border-line pb-2 mb-4">Logistics</h3>
                        <div className="space-y-1">
                            <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Weight (g)</label>
                            <input type="number" name="weight_g" value={formData.weight_g || ''} onChange={handleChange} className="w-full border-b border-line py-2 text-sm focus:outline-none focus:border-ink" placeholder="500" />
                        </div>
                        {/* Dimensions could be expanded, keeping simple for now */}
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-ink border-b border-line pb-2 mb-4">Organization</h3>
                        <div className="space-y-1">
                            <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Category</label>
                            <select name="category" value={formData.category || ''} onChange={handleChange} className="w-full border-b border-line py-2 text-sm focus:outline-none focus:border-ink bg-transparent">
                                <option value="">Select...</option>
                                <option value="Hair Care">Hair Care</option>
                                <option value="Styling">Styling</option>
                                <option value="Body">Body</option>
                                <option value="Fragrance">Fragrance</option>
                                <option value="Sets">Sets</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Tags (Comma separated)</label>
                            {/* handling tags as string for simple input, logic validation can happen in submit if needed or leave as array in state if improved */}
                            <input
                                name="tags_input"
                                value={Array.isArray(formData.tags) ? formData.tags.join(', ') : (formData.tags || '')}
                                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value.split(',').map(s => s.trim()) }))}
                                className="w-full border-b border-line py-2 text-sm focus:outline-none focus:border-ink"
                                placeholder="Sulfate-free, Travel"
                            />
                        </div>
                    </div>
                </div>

                {/* Prices (Stripe IDs or Raw Price? Currently schema has price_id_tw_test. I'll expose that for now, 
                     though ideally this should be a dropdown or more complex price manager.
                     For MVP Admin: Text input for ID is fine as User knows Stripe IDs or we can add instructions) */}
                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-line border-dashed">
                    <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Stripe Price ID (TW)</label>
                        <input name="price_id_tw_test" value={formData.price_id_tw_test || ''} onChange={handleChange} className="w-full border-b border-line py-2 text-xs font-mono focus:outline-none focus:border-ink text-gray-600" placeholder="price_..." />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Stripe Price ID (AU)</label>
                        <input name="price_id_au_test" value={formData.price_id_au_test || ''} onChange={handleChange} className="w-full border-b border-line py-2 text-xs font-mono focus:outline-none focus:border-ink text-gray-600" placeholder="price_..." />
                    </div>
                </div>

                <div className="pt-8 flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-ink text-paper px-8 py-3 text-xs font-mono uppercase tracking-[0.2em] hover:opacity-90 disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : 'Save Product'}
                    </button>
                </div>

            </form>
        </div>
    )
}
