'use client'

import { useEffect, useState } from 'react'
import { createClient } from '../../../../lib/supabase/client'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function ProductList() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('all') // all, active, draft, archived
    const [search, setSearch] = useState('')
    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        const { data, error } = await supabase
            .from('product_pages')
            .select('*')
            .order('created_at', { ascending: true })

        if (data) setProducts(data)
        setLoading(false)
    }

    const handleSoftDelete = async (id, currentStatus) => {
        if (!confirm('Archive this product? It will be hidden from the public.')) return

        const { error } = await supabase
            .from('product_pages')
            .update({ status: 'archived' })
            .eq('id', id)

        if (error) {
            alert('Error archiving: ' + error.message)
        } else {
            fetchProducts()
        }
    }

    // Filter Logic
    const filteredProducts = products.filter(product => {
        const matchesSearch =
            (product.name_en || '').toLowerCase().includes(search.toLowerCase()) ||
            (product.formula_id || '').toLowerCase().includes(search.toLowerCase()) ||
            (product.name_zh || '').includes(search)

        if (filter === 'all') return matchesSearch
        return matchesSearch && (product.status === filter || (filter === 'active' && product.status === 'published'))
    })

    if (loading) return <div className="p-12 text-xs font-mono">LOADING LAB DATA...</div>

    return (
        <div>
            {/* HEADER */}
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="font-serif italic text-3xl">Products</h2>
                    <p className="font-mono text-[10px] text-gray-400 mt-2 uppercase tracking-widest">Inventory & Formulas</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="bg-ink text-paper px-6 py-3 text-xs font-mono uppercase tracking-[0.2em] hover:opacity-90"
                >
                    Add New +
                </Link>
            </div>

            {/* CONTROLS */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                {/* TABS */}
                <div className="flex gap-1 bg-gray-100 p-1 rounded-sm">
                    {['all', 'published', 'draft', 'archived'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 text-[10px] font-mono uppercase tracking-widest transition-colors ${filter === f ? 'bg-white shadow-sm text-ink' : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            {f === 'published' ? 'Active' : f}
                        </button>
                    ))}
                </div>

                {/* SEARCH */}
                <div className="relative w-full md:w-64">
                    <input
                        type="text"
                        placeholder="SEARCH FORMULA / NAME"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-transparent border-b border-line py-2 text-xs font-mono focus:outline-none focus:border-ink placeholder-gray-300"
                    />
                </div>
            </div>

            {/* TABLE */}
            <div className="bg-white border border-line">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-line bg-gray-50">
                            <th className="p-4 w-16 text-[10px] font-mono uppercase tracking-widest text-gray-400">Img</th>
                            <th className="p-4 w-24 text-[10px] font-mono uppercase tracking-widest text-gray-400">Formula</th>
                            <th className="p-4 text-[10px] font-mono uppercase tracking-widest text-gray-400">Product Name</th>
                            <th className="p-4 w-32 text-[10px] font-mono uppercase tracking-widest text-gray-400">Stock</th>
                            <th className="p-4 w-24 text-[10px] font-mono uppercase tracking-widest text-gray-400">Price (TWD)</th>
                            <th className="p-4 w-24 text-[10px] font-mono uppercase tracking-widest text-gray-400">Status</th>
                            <th className="p-4 w-24 text-[10px] font-mono uppercase tracking-widest text-gray-400 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                        {filteredProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50 group">
                                {/* THUMBNAIL */}
                                <td className="p-4">
                                    <div className="w-10 h-10 bg-gray-100 relative overflow-hidden flex items-center justify-center">
                                        {product.image_url ? (
                                            <Image
                                                src={product.image_url}
                                                alt={product.name_en}
                                                fill
                                                className="object-cover"
                                                sizes="40px"
                                            />
                                        ) : (
                                            <span className="text-[8px] text-gray-400">MISSING</span>
                                        )}
                                    </div>
                                </td>

                                {/* FORMULA */}
                                <td className="p-4 font-mono text-xs text-gray-500">{product.formula_id || '—'}</td>

                                {/* NAMES */}
                                <td className="p-4">
                                    <div className="font-serif italic text-lg leading-tight">{product.name_en}</div>
                                    <div className="font-mono text-[10px] text-gray-400 mt-1">{product.name_zh || <span className="text-red-300">MISSING ZH</span>}</div>
                                </td>

                                {/* STOCK */}
                                <td className="p-4">
                                    <div className="flex flex-col">
                                        {product.inventory_count === 0 ? (
                                            <span className="text-[10px] font-mono text-red-500 font-bold uppercase tracking-widest">
                                                SOLD OUT (0)
                                            </span>
                                        ) : product.inventory_count <= (product.low_stock_threshold || 5) ? (
                                            <span className="text-[10px] font-mono text-amber-600 font-bold uppercase tracking-widest">
                                                LOW STOCK ({product.inventory_count})
                                            </span>
                                        ) : (
                                            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                                                IN STOCK ({product.inventory_count})
                                            </span>
                                        )}
                                        <span className="text-[8px] text-gray-300 font-mono mt-0.5">
                                            Threshold: {product.low_stock_threshold || 5}
                                        </span>
                                    </div>
                                </td>

                                {/* PRICE */}
                                <td className="p-4 font-mono text-xs">
                                    {product.price_twd || product.price ? (
                                        <span>${(product.price_twd || product.price).toLocaleString()}</span>
                                    ) : (
                                        <span className="text-amber-500 text-[10px]">UNSET</span>
                                    )}
                                </td>

                                {/* STATUS */}
                                <td className="p-4">
                                    <span className={`inline-block px-2 py-0.5 text-[8px] font-mono uppercase tracking-widest border ${product.status === 'published' ? 'border-green-800 text-green-800 bg-green-50' :
                                        product.status === 'archived' ? 'border-gray-200 text-gray-400 bg-gray-50' :
                                            'border-amber-300 text-amber-600 bg-amber-50'
                                        }`}>
                                        {product.status || 'DRAFT'}
                                    </span>
                                </td>

                                {/* ACTIONS */}
                                <td className="p-4 text-right">
                                    <Link
                                        href={`/admin/products/${product.id}`}
                                        className="inline-block text-[10px] font-mono uppercase tracking-widest text-ink hover:underline mr-4"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleSoftDelete(product.id, product.status)}
                                        className="inline-block text-[10px] font-mono uppercase tracking-widest text-gray-400 hover:text-red-500"
                                    >
                                        Archive
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredProducts.length === 0 && (
                    <div className="p-12 text-center font-mono text-xs text-gray-400">NO PRODUCTS FOUND</div>
                )}
            </div>
        </div>
    )
}

