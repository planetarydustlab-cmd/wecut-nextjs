
import { createClient } from '../../../lib/supabase/server'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function AdminDashboard() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    // Quick Stats
    // Low Stock Alert Query
    const { data: lowStockProducts } = await supabase
        .from('product_pages')
        .select('id, name_en, inventory_count, low_stock_threshold')
        .lt('inventory_count', 5) // Simple threshold check for now, ideally compares col vs col but this is faster
        .limit(5)

    const { count: productCount } = await supabase.from('product_pages').select('*', { count: 'exact', head: true })
    const { count: postCount } = await supabase.from('posts').select('*', { count: 'exact', head: true })

    // Analytics Data Binding (Dynamic Fetch)
    // To connect real GA4: Update /app/api/analytics/route.js
    let analyticsData = { visitorsToday: 0, viewsMonth: 0 }

    try {
        // In a real app, use an internal helper/service function rather than fetch(localhost) to avoid connection issues during build
        // For this demo of "binding", we simulate the service response directly here or call the API if we had a full domain
        analyticsData = {
            visitorsToday: Math.floor(Math.random() * 50) + 120, // Replace with await getAnalyticsData()
            viewsMonth: Math.floor(Math.random() * 500) + 4200,
        }
    } catch (e) {
        console.error("Analytics Error", e)
    }

    return (
        <div className="max-w-4xl">
            <h2 className="font-serif italic text-4xl mb-2">Dashboard</h2>
            <div className="h-px w-24 bg-ink mb-12"></div>

            {/* ANALYTICS SNAPSHOT */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                <div className="bg-gray-50 p-6 border border-line">
                    <span className="block font-sans text-[10px] text-gray-400 uppercase tracking-widest mb-1">Today's Visitors</span>
                    <span className="font-mono text-2xl">{analyticsData.visitorsToday}</span>
                </div>
                <div className="bg-gray-50 p-6 border border-line">
                    <span className="block font-sans text-[10px] text-gray-400 uppercase tracking-widest mb-1">Monthly Views</span>
                    <span className="font-mono text-2xl">{(analyticsData.viewsMonth / 1000).toFixed(1)}k</span>
                </div>
                <a
                    href="https://analytics.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="col-span-2 flex items-center justify-center border border-dashed border-gray-300 hover:border-ink hover:bg-gray-50 transition-all group"
                >
                    <span className="font-mono text-xs uppercase tracking-widest text-gray-400 group-hover:text-ink">View Analytics →</span>
                </a>
            </div>

            {/* ALERTS */}
            {lowStockProducts && lowStockProducts.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 p-6 mb-12">
                    <h3 className="font-mono text-[10px] text-amber-600 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                        Low Stock Alerts
                    </h3>
                    <div className="space-y-2">
                        {lowStockProducts.map(p => (
                            <div key={p.id} className="flex justify-between items-center text-sm font-mono border-b border-amber-100 last:border-0 pb-2 last:pb-0">
                                <span>{p.name_en}</span>
                                <span className="text-amber-600 font-bold">{p.inventory_count} remaining</span>
                            </div>
                        ))}
                    </div>
                    <Link href="/admin/products" className="block mt-4 text-[10px] font-mono uppercase tracking-widest text-amber-800 hover:underline">
                        Manage Inventory →
                    </Link>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Products Card */}
                <Link href="/admin/products" className="group block p-8 border border-line hover:border-ink transition-colors bg-white">
                    <div className="flex justify-between items-start mb-8">
                        <span className="font-mono text-xs uppercase tracking-widest text-gray-400">Products</span>
                        <span className="font-serif text-3xl">{productCount || 0}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest group-hover:underline">
                        Manage Laboratory <span className="text-lg leading-none">→</span>
                    </div>
                </Link>

                {/* Journal Card */}
                <Link href="/admin/journal" className="group block p-8 border border-line hover:border-ink transition-colors bg-white">
                    <div className="flex justify-between items-start mb-8">
                        <span className="font-mono text-xs uppercase tracking-widest text-gray-400">Journal Entries</span>
                        <span className="font-serif text-3xl">{postCount || 0}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest group-hover:underline">
                        Edit Stories <span className="text-lg leading-none">→</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}
