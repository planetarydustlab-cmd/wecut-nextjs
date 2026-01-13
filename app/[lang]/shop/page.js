import { createClient } from '../../../lib/supabase/server'
import { cookies } from 'next/headers'
import AddToCartButton from '../../../components/AddToCartButton'

const dictionaries = {
    en: () => import('../../../i18n/en.json').then((module) => module.default),
    zh: () => import('../../../i18n/zh.json').then((module) => module.default),
}

export async function getDictionary(locale) {
    return dictionaries[locale]()
}

export default async function Shop({ params }) {
    const lang = params.lang || 'en'
    const dict = await getDictionary(lang)
    const isZh = lang === 'zh'

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    // Fetch products from Supabase
    // Select new fields: volume, formula_id, scent_profile_en, scent_profile_zh
    const { data: products } = await supabase
        .from('product_pages')
        .select('*')
        .order('created_at', { ascending: true })

    return (
        <div className="bg-paper min-h-screen pt-24 pb-20 px-6 md:px-12">
            <h1 className="text-[10px] font-mono tracking-[0.2em] uppercase mb-12 md:mb-20 text-gray-400">
                {dict.shop?.title || 'SHOP'} ({products?.length || 0})
            </h1>

            {!products || products.length === 0 ? (
                <div className="text-center py-32 border-t border-b border-line">
                    <p className="font-serif italic text-2xl text-gray-400 mb-4">
                        {isZh ? '實驗室準備中' : 'Formulations in progress.'}
                    </p>
                    <p className="font-mono text-xs text-gray-300 uppercase tracking-widest">
                        Check back soon
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24">
                    {products.map((product) => (
                        <div key={product.id} className="group flex flex-col">
                            {/* Image Area - Lab Style */}
                            <div className="aspect-square bg-[#E8E6E0] mb-8 relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                                {product.image_url ? (
                                    <img
                                        src={product.image_url}
                                        alt={isZh ? product.name_zh : product.name_en}
                                        className="w-full h-full object-cover mix-blend-multiply"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 border border-[#D5D5D0] m-4">
                                        <span className="font-mono text-[10px] text-gray-400 tracking-[0.2em] mb-2">LAB SAMPLE</span>
                                        <span className="font-serif italic text-3xl text-[#C0C0C0]">{product.formula_id || 'N/A'}</span>
                                    </div>
                                )}
                            </div>

                            {/* Product Details - Le Labo / Aesop style */}
                            <div className="flex flex-col flex-1 relative">
                                {/* Top Line: Formula ID and Volume */}
                                <div className="flex justify-between items-baseline mb-3 pb-3 border-b border-line">
                                    <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase text-gray-500">
                                        F.No {product.formula_id || '---'}
                                    </h3>
                                    <span className="font-mono text-[10px] text-gray-400">
                                        {product.volume || '---'}
                                    </span>
                                </div>

                                {/* Name */}
                                <h2 className="font-serif text-2xl italic mb-2 pr-4">
                                    {isZh ? product.name_zh : product.name_en}
                                </h2>

                                {/* Scent Profile */}
                                <p className="font-sans text-[11px] text-gray-500 mb-8 leading-relaxed max-w-[90%]">
                                    {isZh ? product.scent_profile_zh : product.scent_profile_en}
                                </p>

                                {/* Action */}
                                <div className="mt-auto">
                                    <AddToCartButton product={product} lang={lang} />

                                    {/* Notes / Technicals */}
                                    <div className="mt-4 pt-4 border-t border-line border-dashed">
                                        <p className="font-mono text-[9px] text-gray-400 uppercase tracking-widest text-center">
                                            {isZh ? '專業沙龍配方' : 'Professional Grade Formulation'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
