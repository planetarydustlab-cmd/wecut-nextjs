import Link from 'next/link'

const dictionaries = {
    en: () => import('../../i18n/en.json').then((module) => module.default),
    zh: () => import('../../i18n/zh.json').then((module) => module.default),
}

async function getDictionary(locale) {
    return dictionaries[locale]()
}

export default async function Home({ params }) {
    const lang = params.lang || 'en'
    const dict = await getDictionary(lang)
    const isZh = lang === 'zh'

    return (
        <div className="w-full">
            {/* HERO SECTION - Zen Layout */}
            <section className="relative min-h-[100dvh] w-full overflow-hidden flex flex-col justify-center items-center text-[#FAFAF8]">

                {/* Background Image - Full Screen Cover */}
                <img
                    src="/wecut_hero_extended.png"
                    alt="WECUT Interior"
                    className="absolute inset-0 w-full h-full object-cover object-center z-0"
                />

                {/* Dark Overlay for Text Readability */}
                <div className="absolute inset-0 bg-black/30 z-[1]" />

                {/* Content Layer - Centered, Zen */}
                <div className="relative z-10 text-center flex flex-col items-center px-4 md:px-6">

                    {/* Tagline - Smaller */}
                    <p className={`text-[9px] md:text-[10px] mb-8 font-sans font-normal opacity-75 antialiased ${isZh ? 'tracking-[0.08em]' : 'tracking-[0.35em] uppercase'}`}>
                        {dict.hero.tagline}
                    </p>

                    {/* Main Heading - Smaller, More Zen */}
                    <h1 className={`text-5xl md:text-7xl lg:text-8xl mb-6 font-serif italic font-normal antialiased leading-[1.15] ${isZh ? 'tracking-normal' : ''}`}>
                        {dict.hero.headline1}<br />
                        <span className="ml-8 md:ml-16">{dict.hero.headline2}</span>
                    </h1>

                    {/* Subheadline - Single Line */}
                    <p
                        className={`font-serif font-light opacity-70 antialiased mb-10 md:mb-12 whitespace-nowrap ${isZh ? 'tracking-[0.08em] leading-[1.8]' : 'tracking-[0.03em] leading-[1.75]'}`}
                        style={{ fontSize: 'clamp(11px, 1.2vw, 16px)' }}
                    >
                        {dict.hero.subheadline}
                    </p>

                    {/* CTA Buttons - Minimal */}
                    <div className="flex gap-5 md:gap-6">
                        <Link
                            href={`/${lang}/locations`}
                            className={`border border-[#FAFAF8]/50 px-7 md:px-9 py-3 text-[8px] md:text-[9px] hover:bg-[#FAFAF8] hover:text-[#1A1A1A] transition-all duration-700 rounded-none ${isZh ? 'tracking-[0.08em]' : 'tracking-[0.2em] uppercase'}`}
                        >
                            {dict.hero.visit_salon}
                        </Link>
                        <Link
                            href={`/${lang}/shop`}
                            className={`border border-[#FAFAF8]/50 px-7 md:px-9 py-3 text-[8px] md:text-[9px] hover:bg-[#FAFAF8] hover:text-[#1A1A1A] transition-all duration-700 rounded-none ${isZh ? 'tracking-[0.08em]' : 'tracking-[0.2em] uppercase'}`}
                        >
                            {dict.hero.shop_lab}
                        </Link>
                    </div>
                </div>
            </section>

            {/* MANIFESTO SECTION */}
            <section className="py-32 px-8 bg-paper text-center">
                <div className="max-w-3xl mx-auto">
                    <p className={`text-3xl md:text-[2.5rem] font-serif italic font-normal text-ink antialiased ${isZh ? 'leading-[1.8] font-light' : 'leading-[1.6]'}`}>
                        {dict.manifesto.quote}
                    </p>
                </div>
            </section>

            {/* PRODUCT GRID - Lab Labels Style */}
            <section className="border-t border-line bg-paper">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-line">

                    {/* Product 1 */}
                    <div className="p-12 md:p-16 flex flex-col items-center text-center group cursor-pointer hover:bg-white transition-colors min-h-[380px] justify-center border border-line rounded-none">
                        <div className="w-28 h-36 md:w-32 md:h-40 mb-8 rounded-none overflow-hidden bg-[#E8E6E0]">
                             <img 
                                src="/wecut_product.png" 
                                alt="Product"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                        <p className="text-[10px] font-mono text-gray-400 mb-2">SH-01</p>
                        <h4 className={`text-[11px] font-sans font-normal mb-2 ${isZh ? 'tracking-normal' : 'uppercase tracking-[0.2em]'}`}>
                            {isZh ? '洗髮精 01' : 'SHAMPOO 01'}
                        </h4>
                        <p className={`text-sm font-serif italic text-gray-500 ${isZh ? 'font-light' : 'font-normal'}`}>
                            {isZh ? '保濕配方' : 'Hydrating Formula'}
                        </p>
                    </div>

                    {/* Product 2 */}
                    <div className="p-12 md:p-16 flex flex-col items-center text-center group cursor-pointer hover:bg-white transition-colors min-h-[380px] justify-center border border-line rounded-none">
                        <div className="w-28 h-36 md:w-32 md:h-40 mb-8 rounded-none overflow-hidden bg-[#E8E6E0]">
                             <img 
                                src="/wecut_product.png" 
                                alt="Product"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                        <p className="text-[10px] font-mono text-gray-400 mb-2">CD-01</p>
                        <h4 className={`text-[11px] font-sans font-normal mb-2 ${isZh ? 'tracking-normal' : 'uppercase tracking-[0.2em]'}`}>
                            {isZh ? '護髮素 01' : 'CONDITIONER 01'}
                        </h4>
                        <p className={`text-sm font-serif italic text-gray-500 ${isZh ? 'font-light' : 'font-normal'}`}>
                            {isZh ? '修護配方' : 'Repairing Agent'}
                        </p>
                    </div>

                    {/* Product 3 */}
                    <div className="p-12 md:p-16 flex flex-col items-center text-center group cursor-pointer hover:bg-white transition-colors min-h-[380px] justify-center border border-line rounded-none">
                        <div className="w-28 h-36 md:w-32 md:h-40 mb-8 rounded-none overflow-hidden bg-[#E8E6E0]">
                             <img 
                                src="/wecut_product.png" 
                                alt="Product"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                        <p className="text-[10px] font-mono text-gray-400 mb-2">TX-02</p>
                        <h4 className={`text-[11px] font-sans font-normal mb-2 ${isZh ? 'tracking-normal' : 'uppercase tracking-[0.2em]'}`}>
                            {isZh ? '紋理膏' : 'TEXTURE PASTE'}
                        </h4>
                        <p className={`text-sm font-serif italic text-gray-500 ${isZh ? 'font-light' : 'font-normal'}`}>
                            {isZh ? '霧面定型' : 'Matte Finish'}
                        </p>
                    </div>

                    {/* The Lab CTA */}
                    <div className="p-12 md:p-16 flex flex-col justify-center items-center bg-[#E8E6E0] text-center min-h-[380px] rounded-none">
                        <h2 className={`text-3xl md:text-4xl mb-6 font-serif italic ${isZh ? 'font-light' : 'font-normal'}`}>
                            {dict.shop.title}
                        </h2>
                        <p className={`text-[10px] mb-8 max-w-[220px] leading-relaxed font-sans text-gray-600 ${isZh ? 'tracking-normal' : 'tracking-[0.1em]'}`}>
                            {isZh ? '為特定髮質與氣候調配的專屬配方。' : 'Formulations crafted for specific hair textures and climates.'}
                        </p>
                        <Link href={`/${lang}/shop`} className={`text-[10px] underline underline-offset-4 font-sans hover:opacity-60 transition-opacity ${isZh ? 'tracking-normal' : 'uppercase tracking-[0.2em]'}`}>
                            {dict.shop.view_all}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
