import Link from 'next/link'

const dictionaries = {
    en: () => import('../../../i18n/en.json').then((module) => module.default),
    zh: () => import('../../../i18n/zh.json').then((module) => module.default),
}

async function getDictionary(locale) {
    return dictionaries[locale]()
}

export default async function Shop({ params }) {
    const lang = params.lang || 'en'
    const dict = await getDictionary(lang)
    const isZh = lang === 'zh'

    const products = [
        { code: 'SH-01', name: isZh ? '洗髮精 01' : 'SHAMPOO 01', description: isZh ? '保濕配方' : 'Hydrating Formula', notes: 'Cedarwood, Bergamot' },
        { code: 'CD-01', name: isZh ? '護髮素 01' : 'CONDITIONER 01', description: isZh ? '修護配方' : 'Repairing Agent', notes: 'Argan, Rosemary' },
        { code: 'TX-02', name: isZh ? '紋理膏' : 'TEXTURE PASTE', description: isZh ? '霧面定型' : 'Matte Finish', notes: 'Beeswax, Kaolin' },
        { code: 'OL-03', name: isZh ? '護髮油' : 'HAIR OIL', description: isZh ? '光澤精華' : 'Shine Serum', notes: 'Jojoba, Vitamin E' },
        { code: 'SP-01', name: isZh ? '海鹽噴霧' : 'SEA SALT SPRAY', description: isZh ? '紋理蓬鬆' : 'Texture & Volume', notes: 'Sea Minerals, Aloe' },
        { code: 'PM-02', name: isZh ? '髮蠟' : 'POMADE', description: isZh ? '中等定型' : 'Medium Hold', notes: 'Lanolin, Tea Tree' },
    ]

    return (
        <div className="bg-paper min-h-screen">
            {/* HEADER */}
            <section className="pt-24 pb-16 px-6 border-b border-line">
                <div className="max-w-6xl mx-auto">
                    <p className={`text-[10px] font-mono text-gray-500 mb-4 ${isZh ? 'tracking-normal' : 'tracking-[0.4em] uppercase'}`}>
                        {dict.shop.subtitle}
                    </p>
                    <h1 className={`text-5xl md:text-7xl font-serif italic ${isZh ? 'font-light' : 'font-normal'}`}>
                        {dict.shop.title}
                    </h1>
                </div>
            </section>

            {/* PRODUCT GRID */}
            <section className="max-w-6xl mx-auto py-16 px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="border border-line p-8 group cursor-pointer hover:bg-white transition-colors rounded-none"
                        >
                            <div className="w-full aspect-[4/3] mb-8 overflow-hidden bg-[#E8E6E0]">
                                <img 
                                    src="/wecut_product.png" 
                                    alt={product.name}
                                    className="w-full h-full object-cover rounded-none grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>

                            <div className="border-t border-line pt-6">
                                <p className="text-[10px] font-mono text-gray-400 mb-2">
                                    FORMULA NO. {product.code}
                                </p>
                                <h3 className={`text-[11px] font-sans font-normal mb-2 ${isZh ? 'tracking-normal' : 'uppercase tracking-[0.2em]'}`}>
                                    {product.name}
                                </h3>
                                <p className={`text-sm font-serif italic text-gray-500 mb-4 ${isZh ? 'font-light' : 'font-normal'}`}>
                                    {product.description}
                                </p>
                                <p className="text-[10px] font-mono text-gray-400 mb-6">
                                    NOTES: {product.notes.toUpperCase()}
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className={`text-xs font-mono text-gray-400 ${isZh ? 'tracking-normal' : 'uppercase tracking-[0.1em]'}`}>
                                        {dict.shop.coming_soon}
                                    </span>
                                    <span className="border border-gray-300 text-gray-400 px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-sans rounded-none cursor-not-allowed">
                                        {dict.shop.notify_me}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="border-t border-line py-24">
                <div className="max-w-2xl mx-auto text-center px-6">
                    <h2 className={`text-3xl font-serif italic mb-6 ${isZh ? 'font-light' : 'font-normal'}`}>
                        {isZh ? '專屬配方' : 'Custom Formulations'}
                    </h2>
                    <p className={`font-sans text-sm text-gray-600 mb-8 ${isZh ? 'leading-loose' : 'leading-relaxed'}`}>
                        {isZh ? '需要針對您的髮質或氣候的特定配方？請聯繫我們進行個人化諮詢。' : 'Need something specific for your hair texture or climate? Contact us for a personalized consultation.'}
                    </p>
                    <Link
                        href={`/${lang}/locations`}
                        className={`border border-ink px-8 py-3 text-[10px] font-sans hover:bg-ink hover:text-paper transition-colors rounded-none inline-block ${isZh ? 'tracking-normal' : 'tracking-[0.2em] uppercase'}`}
                    >
                        {dict.hero.visit_salon}
                    </Link>
                </div>
            </section>
        </div>
    )
}
