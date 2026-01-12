const dictionaries = {
    en: () => import('../../../i18n/en.json').then((module) => module.default),
    zh: () => import('../../../i18n/zh.json').then((module) => module.default),
}

async function getDictionary(locale) {
    return dictionaries[locale]()
}

export default async function About({ params }) {
    const lang = params.lang || 'en'
    const dict = await getDictionary(lang)
    const isZh = lang === 'zh'

    return (
        <div className="bg-paper min-h-screen">
            {/* HEADER */}
            <section className="pt-24 pb-16 px-6 border-b border-line">
                <div className="max-w-6xl mx-auto">
                    <p className={`text-[10px] font-mono text-gray-500 mb-4 ${isZh ? 'tracking-normal' : 'tracking-[0.4em] uppercase'}`}>
                        {dict.about.subtitle}
                    </p>
                    <h1 className={`text-5xl md:text-7xl font-serif italic ${isZh ? 'font-light' : 'font-normal'}`}>
                        {dict.about.title}
                    </h1>
                </div>
            </section>

            {/* TIMELINE */}
            <section className="max-w-6xl mx-auto">

                {/* 2012 */}
                <div className="grid grid-cols-1 md:grid-cols-3 border-b border-line">
                    <div className="p-8 md:p-12 md:border-r border-line">
                        <p className="text-5xl md:text-6xl font-mono font-light text-gray-300">2012</p>
                        <p className={`text-[10px] font-sans text-gray-500 mt-4 ${isZh ? 'tracking-normal' : 'tracking-[0.3em] uppercase'}`}>
                            {isZh ? '創立於昆士蘭' : 'EST. MOUNT GRAVATT, QLD'}
                        </p>
                        <p className="text-[10px] font-mono text-gray-400 mt-2">
                            27.5339° S, 153.0833° E
                        </p>
                    </div>
                    <div className="col-span-2 p-8 md:p-12">
                        <h3 className={`text-2xl font-serif italic mb-6 ${isZh ? 'font-light' : 'font-normal'}`}>
                            {isZh ? '起源' : 'Origin'}
                        </h3>
                        <p className={`font-sans text-sm text-gray-600 mb-4 ${isZh ? 'leading-loose' : 'leading-relaxed'}`}>
                            {isZh
                                ? 'WECUT 誕生於一個簡單的觀察：髮型護理中臨床精準與人文藝術之間的差距。在昆士蘭的一個混凝土小空間裡，我們開始了實驗。'
                                : 'WECUT was born from a simple observation: the gap between clinical precision and human artistry in hair care. In a small concrete space in Mount Gravatt, we began experimenting.'}
                        </p>
                        <p className={`font-sans text-sm text-gray-600 ${isZh ? 'leading-loose' : 'leading-relaxed'}`}>
                            {isZh
                                ? '免預約。無矯飾。純粹的技藝與原始的紋理相遇。'
                                : 'No appointments. No pretense. Just raw skill meeting raw texture.'}
                        </p>
                    </div>
                </div>

                {/* 2018 */}
                <div className="grid grid-cols-1 md:grid-cols-3 border-b border-line">
                    <div className="p-8 md:p-12 md:border-r border-line">
                        <p className="text-5xl md:text-6xl font-mono font-light text-gray-300">2018</p>
                        <p className={`text-[10px] font-sans text-gray-500 mt-4 ${isZh ? 'tracking-normal' : 'tracking-[0.3em] uppercase'}`}>
                            {isZh ? '實驗室協議' : 'THE LAB PROTOCOL'}
                        </p>
                    </div>
                    <div className="col-span-2 p-8 md:p-12">
                        <h3 className={`text-2xl font-serif italic mb-6 ${isZh ? 'font-light' : 'font-normal'}`}>
                            {isZh ? '實驗室' : 'The Laboratory'}
                        </h3>
                        <p className={`font-sans text-sm text-gray-600 mb-4 ${isZh ? 'leading-loose' : 'leading-relaxed'}`}>
                            {isZh
                                ? '我們開發了自己的配方。這些產品不是為了貨架而設計，而是為了特定的髮質和氣候。每一瓶都帶有配方編號，而非行銷口號。'
                                : 'We developed our own formulations. Products designed not for shelves, but for specific hair textures and climates. Each bottle carries a formula number, not a marketing slogan.'}
                        </p>
                        <p className={`font-serif italic text-lg text-gray-500 mt-6 ${isZh ? 'font-light' : ''}`}>
                            {isZh
                                ? '「精準並非冷酷。它是最深刻的關懷形式。」'
                                : '"Precision is not cold. It is the deepest form of care."'}
                        </p>
                    </div>
                </div>

                {/* 2023 */}
                <div className="grid grid-cols-1 md:grid-cols-3 border-b border-line">
                    <div className="p-8 md:p-12 md:border-r border-line">
                        <p className="text-5xl md:text-6xl font-mono font-light text-gray-300">2023</p>
                        <p className={`text-[10px] font-sans text-gray-500 mt-4 ${isZh ? 'tracking-normal' : 'tracking-[0.3em] uppercase'}`}>
                            {isZh ? '台北拓展' : 'TAIPEI EXPANSION'}
                        </p>
                        <p className="text-[10px] font-mono text-gray-400 mt-2">
                            25.0330° N, 121.5654° E
                        </p>
                    </div>
                    <div className="col-span-2 p-8 md:p-12">
                        <h3 className={`text-2xl font-serif italic mb-6 ${isZh ? 'font-light' : 'font-normal'}`}>
                            {isZh ? '拓展' : 'Expansion'}
                        </h3>
                        <p className={`font-sans text-sm text-gray-600 ${isZh ? 'leading-loose' : 'leading-relaxed'}`}>
                            {isZh
                                ? '台北帶來了新的挑戰：亞洲髮質、都市濕度、不同的生活節奏。我們調整了協議，精煉了配方，並學到了精準是普世的，但應用是在地的。'
                                : 'Taipei offered a new challenge: Asian hair textures, urban humidity, a different rhythm of life. We adapted our protocols, refined our formulas, and learned that precision is universal but application is local.'}
                        </p>
                    </div>
                </div>

                {/* NOW */}
                <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="p-8 md:p-12 md:border-r border-line">
                        <p className="text-5xl md:text-6xl font-mono font-light text-gray-300">
                            {isZh ? '現在' : 'NOW'}
                        </p>
                        <p className={`text-[10px] font-sans text-gray-500 mt-4 ${isZh ? 'tracking-normal' : 'tracking-[0.3em] uppercase'}`}>
                            {isZh ? '全球實驗室' : 'GLOBAL LABS'}
                        </p>
                    </div>
                    <div className="col-span-2 p-8 md:p-12">
                        <h3 className={`text-2xl font-serif italic mb-6 ${isZh ? 'font-light' : 'font-normal'}`}>
                            {isZh ? '對話持續' : 'The Dialogue Continues'}
                        </h3>
                        <p className={`font-sans text-sm text-gray-600 mb-4 ${isZh ? 'leading-loose' : 'leading-relaxed'}`}>
                            {isZh
                                ? 'WECUT 是粗獷與精緻之間的對話。我們不是連鎖店。我們是擁有據點的實驗室。每個空間都反映其環境，同時共享共同的理念。'
                                : 'WECUT is a dialogue between the raw and the refined. We are not a franchise. We are a laboratory with outposts. Each space reflects its environment while sharing a common philosophy.'}
                        </p>
                        <p className={`font-sans text-sm text-gray-600 ${isZh ? 'leading-loose' : 'leading-relaxed'}`}>
                            {isZh
                                ? '兩個據點。一個標準。零妥協。'
                                : 'Two locations. One standard. Zero compromise.'}
                        </p>
                    </div>
                </div>
            </section>

            {/* METRICS */}
            <section className="border-t border-line mt-16">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-line">
                    <div className="p-8 md:p-12 text-center">
                        <p className="text-4xl md:text-5xl font-mono font-light">12</p>
                        <p className={`text-[10px] font-sans text-gray-500 mt-2 ${isZh ? 'tracking-normal' : 'uppercase tracking-[0.2em]'}`}>
                            {isZh ? '年' : 'Years Active'}
                        </p>
                    </div>
                    <div className="p-8 md:p-12 text-center">
                        <p className="text-4xl md:text-5xl font-mono font-light">2</p>
                        <p className={`text-[10px] font-sans text-gray-500 mt-2 ${isZh ? 'tracking-normal' : 'uppercase tracking-[0.2em]'}`}>
                            {isZh ? '據點' : 'Locations'}
                        </p>
                    </div>
                    <div className="p-8 md:p-12 text-center">
                        <p className="text-4xl md:text-5xl font-mono font-light">8</p>
                        <p className={`text-[10px] font-sans text-gray-500 mt-2 ${isZh ? 'tracking-normal' : 'uppercase tracking-[0.2em]'}`}>
                            {isZh ? '配方' : 'Formulations'}
                        </p>
                    </div>
                    <div className="p-8 md:p-12 text-center">
                        <p className="text-4xl md:text-5xl font-mono font-light">∞</p>
                        <p className={`text-[10px] font-sans text-gray-500 mt-2 ${isZh ? 'tracking-normal' : 'uppercase tracking-[0.2em]'}`}>
                            {isZh ? '紋理' : 'Textures'}
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}
