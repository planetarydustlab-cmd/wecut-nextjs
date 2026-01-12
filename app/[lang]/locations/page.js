import Link from 'next/link'

const dictionaries = {
    en: () => import('../../../i18n/en.json').then((module) => module.default),
    zh: () => import('../../../i18n/zh.json').then((module) => module.default),
}

async function getDictionary(locale) {
    return dictionaries[locale]()
}

export default async function Locations({ params }) {
    const lang = params.lang || 'en'
    const dict = await getDictionary(lang)
    const isZh = lang === 'zh'

    return (
        <div className="bg-paper min-h-screen">
            {/* HEADER */}
            <section className="pt-24 pb-16 px-6 border-b border-line">
                <div className="max-w-6xl mx-auto">
                    <p className={`text-[10px] font-mono text-gray-500 mb-4 ${isZh ? 'tracking-normal' : 'tracking-[0.4em] uppercase'}`}>
                        {dict.locations.subtitle}
                    </p>
                    <h1 className={`text-5xl md:text-7xl font-serif italic ${isZh ? 'font-light' : 'font-normal'}`}>
                        {dict.locations.title}
                    </h1>
                </div>
            </section>

            {/* LOCATIONS GRID */}
            <section className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-line">

                    {/* AUSTRALIA */}
                    <div className="p-8 md:p-12 border-b border-line">
                        <div className="flex justify-between items-start mb-8">
                            <p className={`text-[10px] font-sans text-gray-500 ${isZh ? 'tracking-normal' : 'tracking-[0.3em] uppercase'}`}>
                                01. {dict.locations.origin}
                            </p>
                            <span className="text-[10px] font-mono text-gray-400">SYD</span>
                        </div>

                        <div className="h-64 bg-gray-200 mb-8 overflow-hidden rounded-none">
                            <img
                                src="/wecut_australia_location.png"
                                alt="Mount Gravatt Interior"
                                className="w-full h-full object-cover grayscale"
                            />
                        </div>

                        <h2 className={`text-3xl font-serif italic mb-2 ${isZh ? 'font-light' : 'font-normal'}`}>
                            {isZh ? '昆士蘭布里斯本' : 'Mount Gravatt East'}
                        </h2>
                        <p className={`text-[10px] font-sans text-gray-500 mb-8 ${isZh ? 'tracking-normal' : 'tracking-[0.3em] uppercase'}`}>
                            {isZh ? '澳洲昆士蘭' : 'QUEENSLAND, AUSTRALIA'}
                        </p>

                        <div className="border-l-2 border-ink pl-4 mb-8">
                            <p className="font-mono text-sm mb-1">103/55 Creek Rd</p>
                            <p className="font-mono text-sm mb-4">Mount Gravatt East, QLD 4122</p>
                            <p className="font-sans text-xs text-gray-500">
                                {isZh ? '週一至週六：10am - 6pm' : 'Mon - Sat: 10am - 6pm'}
                            </p>
                        </div>

                        <p className={`font-serif italic text-gray-600 mb-8 ${isZh ? 'font-light leading-loose' : ''}`}>
                            {isZh ? '起源之地。粗獷的紋理與海岸的光線在此相遇。' : 'The foundation. Where raw textures meet coastal light.'}
                        </p>

                        <div className="flex items-center justify-between pt-6 border-t border-line">
                            <p className="font-mono text-[10px] text-gray-400">
                                27.5339° S, 153.0833° E
                            </p>
                            <span className={`text-[10px] font-sans border border-ink px-4 py-2 rounded-none ${isZh ? 'tracking-normal' : 'uppercase tracking-[0.2em]'}`}>
                                {dict.locations.walk_in}
                            </span>
                        </div>
                    </div>

                    {/* TAIPEI */}
                    <div className="p-8 md:p-12">
                        <div className="flex justify-between items-start mb-8">
                            <p className={`text-[10px] font-sans text-gray-500 ${isZh ? 'tracking-normal' : 'tracking-[0.3em] uppercase'}`}>
                                02. {dict.locations.expansion}
                            </p>
                            <span className="text-[10px] font-mono text-gray-400">TPE</span>
                        </div>

                        <div className="h-64 bg-gray-200 mb-8 overflow-hidden rounded-none">
                            <img
                                src="/wecut_taipei_location.png"
                                alt="Taipei Interior"
                                className="w-full h-full object-cover grayscale"
                            />
                        </div>

                        <h2 className={`text-3xl font-serif italic mb-2 ${isZh ? 'font-light' : 'font-normal'}`}>
                            {isZh ? '台北' : 'Taipei City'}
                        </h2>
                        <p className={`text-[10px] font-sans text-gray-500 mb-8 ${isZh ? 'tracking-normal' : 'tracking-[0.3em] uppercase'}`}>
                            {isZh ? '台灣' : 'TAIWAN'}
                        </p>

                        <div className="border-l-2 border-ink pl-4 mb-8">
                            <p className="font-mono text-sm mb-1">{isZh ? '龍安路202巷51號' : 'No.51 Lane 202, Longan Road'}</p>
                            <p className="font-mono text-sm mb-4">{isZh ? '新北市' : 'New Taipei City, Taiwan'}</p>
                            <p className="font-sans text-xs text-gray-500">
                                {isZh ? '僅限預約' : 'By Appointment Only'}
                            </p>
                        </div>

                        <p className={`font-serif italic text-gray-600 mb-8 ${isZh ? 'font-light leading-loose' : ''}`}>
                            {isZh ? '進化之地。都市的精準與亞洲紋理在此交融。' : 'The evolution. Urban precision meets Asian texture.'}
                        </p>

                        <div className="flex items-center justify-between pt-6 border-t border-line">
                            <p className="font-mono text-[10px] text-gray-400">
                                25.0330° N, 121.5654° E
                            </p>
                            <a
                                href="https://fresha.com/p/wecut-3729638"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-[10px] font-sans border border-ink px-4 py-2 hover:bg-ink hover:text-paper transition-colors rounded-none ${isZh ? 'tracking-normal' : 'uppercase tracking-[0.2em]'}`}
                            >
                                {dict.locations.book_now}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
