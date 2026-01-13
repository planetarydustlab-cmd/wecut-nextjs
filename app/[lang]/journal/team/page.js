import Link from 'next/link'

const dictionaries = {
    en: () => import('../../../../i18n/en.json').then((module) => module.default),
    zh: () => import('../../../../i18n/zh.json').then((module) => module.default),
}

async function getDictionary(locale) {
    return dictionaries[locale]()
}

export default async function Team({ params }) {
    const lang = params.lang || 'en'
    const dict = await getDictionary(lang)
    const isZh = lang === 'zh'

    return (
        <div className="bg-paper min-h-screen">
            <section className="pt-24 pb-16 px-6 border-b border-line">
                <div className="max-w-6xl mx-auto">
                    <p className={`text-[10px] font-mono text-gray-500 mb-4 ${isZh ? 'tracking-normal' : 'tracking-[0.4em] uppercase'}`}>
                        {dict.journal.subtitle} / {dict.journal.team}
                    </p>
                    <h1 className={`text-5xl md:text-7xl font-serif italic mb-8 ${isZh ? 'font-light' : 'font-normal'}`}>
                        {dict.journal.team}
                    </h1>
                    <div className={`flex space-x-8 text-xs font-sans ${isZh ? 'tracking-normal' : 'tracking-widest uppercase'}`}>
                        <Link href={`/${lang}/journal`} className="hover:opacity-60 transition-opacity border-b border-transparent hover:border-ink pb-1">
                            {dict.journal.title}
                        </Link>
                        <Link href={`/${lang}/journal/careers`} className="hover:opacity-60 transition-opacity border-b border-transparent hover:border-ink pb-1">
                            {dict.journal.careers}
                        </Link>
                    </div>
                </div>
            </section>

            {/* INTRO TEXT */}
            <section className="max-w-3xl mx-auto px-6 pt-16 pb-8 text-center">
                <p className={`text-base md:text-lg leading-relaxed text-gray-700 ${isZh ? 'font-sans font-light' : 'font-serif italic'}`}>
                    {isZh
                        ? 'WECUT 團隊以「精準剪裁、誠實服務、穩定一致」為共同標準。每位設計師都在同一套方法下工作——幾何、質地、克制——讓每一次整理都更可預期，也更貼近個人。'
                        : 'The WECUT team is built around precision cutting, honest service, and calm consistency. Each stylist works within a shared method—geometry, texture, and restraint—so every appointment feels deliberate, repeatable, and quietly personal.'
                    }
                </p>
            </section>

            {/* TEAM GRID */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {/* Member 1 */}
                    <div className="group cursor-pointer">
                        <div className="aspect-[3/4] bg-[#E8E6E0] mb-6 grayscale group-hover:grayscale-0 transition-all duration-700 relative overflow-hidden">
                            {/* Placeholder for image */}
                            <div className="absolute inset-0 flex items-center justify-center text-gray-300 font-mono text-xs tracking-widest uppercase">
                                Portrait
                            </div>
                        </div>
                        <h3 className={`text-xl font-serif italic mb-1 ${isZh ? 'font-light' : 'font-normal'}`}>
                            {isZh ? '陳 冠宇' : 'Guanyu Chen'}
                        </h3>
                        <p className={`text-[10px] font-sans text-gray-500 mb-4 ${isZh ? 'tracking-normal' : 'uppercase tracking-[0.2em]'}`}>
                            {isZh ? '創意總監' : 'Creative Director'}
                        </p>
                        <p className={`text-sm text-gray-600 leading-relaxed max-w-sm ${isZh ? 'font-light' : 'font-normal'}`}>
                            {isZh ? '專注於幾何剪裁與自然紋理的結合，擁有超過 15 年的造型經驗。' : 'Focusing on the intersection of geometric cutting and natural texture, with over 15 years of styling experience.'}
                        </p>
                    </div>

                    {/* Member 2 */}
                    <div className="group cursor-pointer">
                        <div className="aspect-[3/4] bg-[#E8E6E0] mb-6 grayscale group-hover:grayscale-0 transition-all duration-700 relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-300 font-mono text-xs tracking-widest uppercase">
                                Portrait
                            </div>
                        </div>
                        <h3 className={`text-xl font-serif italic mb-1 ${isZh ? 'font-light' : 'font-normal'}`}>
                            {isZh ? '林 雅婷' : 'Yating Lin'}
                        </h3>
                        <p className={`text-[10px] font-sans text-gray-500 mb-4 ${isZh ? 'tracking-normal' : 'uppercase tracking-[0.2em]'}`}>
                            {isZh ? '資深設計師' : 'Senior Stylist'}
                        </p>
                        <p className={`text-sm text-gray-600 leading-relaxed max-w-sm ${isZh ? 'font-light' : 'font-normal'}`}>
                            {isZh ? '擅長色彩設計與個性化造型，為每位顧客打造獨特風格。' : 'Specializing in color design and personalized styling, creating unique looks for every client.'}
                        </p>
                    </div>

                    {/* Member 3 */}
                    <div className="group cursor-pointer">
                        <div className="aspect-[3/4] bg-[#E8E6E0] mb-6 grayscale group-hover:grayscale-0 transition-all duration-700 relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-300 font-mono text-xs tracking-widest uppercase">
                                Portrait
                            </div>
                        </div>
                        <h3 className={`text-xl font-serif italic mb-1 ${isZh ? 'font-light' : 'font-normal'}`}>
                            {isZh ? '張 偉德' : 'Wei-Te Chang'}
                        </h3>
                        <p className={`text-[10px] font-sans text-gray-500 mb-4 ${isZh ? 'tracking-normal' : 'uppercase tracking-[0.2em]'}`}>
                            {isZh ? '設計師 / 染髮師' : 'Stylist / Colorist'}
                        </p>
                        <p className={`text-sm text-gray-600 leading-relaxed max-w-sm ${isZh ? 'font-light' : 'font-normal'}`}>
                            {isZh ? '熱衷於探索新的染髮技術與趨勢，創造充滿活力的色彩。' : 'Passionate about exploring new hair coloring techniques and trends to create vibrant colors.'}
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}
