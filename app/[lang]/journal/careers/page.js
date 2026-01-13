import Link from 'next/link'

const dictionaries = {
    en: () => import('../../../../i18n/en.json').then((module) => module.default),
    zh: () => import('../../../../i18n/zh.json').then((module) => module.default),
}

async function getDictionary(locale) {
    return dictionaries[locale]()
}

export default async function Careers({ params }) {
    const lang = params.lang || 'en'
    const dict = await getDictionary(lang)
    const isZh = lang === 'zh'

    return (
        <div className="bg-paper min-h-screen">
            <section className="pt-24 pb-16 px-6 border-b border-line">
                <div className="max-w-6xl mx-auto">
                    <p className={`text-[10px] font-mono text-gray-500 mb-4 ${isZh ? 'tracking-normal' : 'tracking-[0.4em] uppercase'}`}>
                        {dict.journal.subtitle} / {dict.journal.careers}
                    </p>
                    <h1 className={`text-5xl md:text-7xl font-serif italic mb-8 ${isZh ? 'font-light' : 'font-normal'}`}>
                        {dict.journal.careers}
                    </h1>
                    <div className={`flex space-x-8 text-xs font-sans ${isZh ? 'tracking-normal' : 'tracking-widest uppercase'}`}>
                        <Link href={`/${lang}/journal`} className="hover:opacity-60 transition-opacity border-b border-transparent hover:border-ink pb-1">
                            {dict.journal.title}
                        </Link>
                        <Link href={`/${lang}/journal/careers`} className="opacity-100 border-b border-ink pb-1">
                            {dict.journal.careers}
                        </Link>
                    </div>
                </div>
            </section>
            {/* TEAM PITCH */}
            <section className="max-w-3xl mx-auto px-6 py-16 text-center">
                <p className={`text-base md:text-lg leading-relaxed text-gray-700 ${isZh ? 'font-sans font-light' : 'font-serif italic'}`}>
                    {isZh
                        ? 'WECUT 是一間以「精準剪裁」與「自然質地」為核心的設計型髮廊。我們重視手感、節奏與溝通，也相信好的作品來自長期的訓練與穩定的日常。'
                        : 'WECUT is a design-led salon studio built on precision cutting and natural texture. We value craft, pace, and clear communication—and we believe great work comes from consistent training and calm daily practice.'
                    }
                </p>
                <p className="font-mono text-[10px] text-gray-400 mt-6 tracking-widest uppercase">
                    {isZh
                        ? '目前僅招募 台灣（New Taipei City）團隊，我們長期開放人才加入。'
                        : 'We are currently hiring for Taiwan (New Taipei City) only. We’re always open to meeting talented people.'
                    }
                </p>
            </section>

            {/* OPEN ROLES */}
            <section className="max-w-4xl mx-auto px-6 pb-24">
                <div className="flex items-center justify-between mb-8 border-b border-line pb-4">
                    <h2 className="font-serif italic text-2xl md:text-3xl">Open Roles</h2>
                    <span className="font-mono text-[10px] uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-full text-gray-500">
                        Taiwan
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Role 1: Hair Stylist */}
                    <div className="bg-white border border-line p-8 flex flex-col">
                        <h3 className={`text-xl mb-4 ${isZh ? 'font-sans font-medium' : 'font-serif italic'}`}>
                            {isZh ? '髮型師' : 'Hair Stylist'}
                        </h3>

                        <div className="space-y-4 flex-1">
                            <div>
                                <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2">Scope</p>
                                <p className={`text-sm text-gray-600 leading-relaxed ${isZh ? 'font-light' : ''}`}>
                                    {isZh
                                        ? '剪裁 / 造型 / 染燙（依你的強項配置）、顧客諮詢與風格建議、作品紀錄'
                                        : 'Cutting / styling / color-perm (based on strengths), consultation, documenting work'
                                    }
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2">Ideal Candidate</p>
                                <p className={`text-sm text-gray-600 leading-relaxed ${isZh ? 'font-light' : ''}`}>
                                    {isZh
                                        ? '重視細節、溝通清楚、願意持續精進技術與審美'
                                        : 'Values detail, clear communication, willing to refine technique and aesthetic'
                                    }
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 pt-4 border-t border-line border-dashed">
                            <p className="text-[10px] font-mono text-gray-400">
                                {isZh ? '加分：有自己的作品集（IG/Behance/相簿連結皆可）' : 'Plus: Portfolio link (IG/Behance/Album)'}
                            </p>
                        </div>
                    </div>

                    {/* Role 2: Assistant Stylist */}
                    <div className="bg-white border border-line p-8 flex flex-col">
                        <h3 className={`text-xl mb-4 ${isZh ? 'font-sans font-medium' : 'font-serif italic'}`}>
                            {isZh ? '助理髮型師' : 'Assistant Stylist'}
                        </h3>

                        <div className="space-y-4 flex-1">
                            <div>
                                <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2">Scope</p>
                                <p className={`text-sm text-gray-600 leading-relaxed ${isZh ? 'font-light' : ''}`}>
                                    {isZh
                                        ? '洗護、基礎操作協助、環境與工具整理、跟台練習與觀摩'
                                        : 'Wash & care, daily station support, tools & studio upkeep, learning by shadowing'
                                    }
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2">Ideal Candidate</p>
                                <p className={`text-sm text-gray-600 leading-relaxed ${isZh ? 'font-light' : ''}`}>
                                    {isZh
                                        ? '手腳俐落、耐心、願意把基本功做漂亮'
                                        : 'Quick, patient, willing to master the basics beautifully'
                                    }
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 pt-4 border-t border-line border-dashed">
                            <p className="text-[10px] font-mono text-gray-400">
                                {isZh ? '加分：對髮型/質感/影像有興趣，喜歡學習與紀錄' : 'Plus: Interest in hair/texture/image, enjoys learning'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* APPLY CTA */}
                <div className="mt-16 text-center">
                    <a
                        href={`mailto:nowonstudio.tw@gmail.com?subject=${isZh ? '[WECUT Careers] 應徵｜職缺名稱｜你的名字' : '[WECUT Careers] Apply | Role Name | Your Name'}`}
                        className="inline-block bg-ink text-paper px-8 py-4 text-xs font-mono uppercase tracking-[0.2em] hover:opacity-90 transition-opacity"
                    >
                        {isZh ? 'Email 申請' : 'Email to Apply'}
                    </a>

                    <div className="mt-8 max-w-lg mx-auto text-center">
                        <p className={`text-sm text-gray-500 mb-2 ${isZh ? 'font-light' : ''}`}>
                            {isZh ? '請寄：簡短自我介紹 + 履歷（或經歷）+ 作品集/社群連結' : 'Email a short intro + CV + portfolio/social links'}
                        </p>
                        <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                            nowonstudio.tw@gmail.com
                        </p>
                        <p className={`mt-6 text-xs text-gray-400 ${isZh ? 'font-light' : 'italic'}`}>
                            {isZh
                                ? '（我們也歡迎你即使沒看到完全符合的職缺，仍可寄信自薦；WECUT 長期徵求合拍的夥伴。）'
                                : '(If you don’t see a perfect match, feel free to reach out—rolling hiring.)'
                            }
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}
