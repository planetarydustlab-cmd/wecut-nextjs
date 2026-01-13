import Link from 'next/link'

const dictionaries = {
    en: () => import('../../../../i18n/en.json').then((module) => module.default),
    zh: () => import('../../../../i18n/zh.json').then((module) => module.default),
}

async function getDictionary(locale) {
    return dictionaries[locale]()
}

export default async function Guides({ params }) {
    const lang = params.lang || 'en'
    const dict = await getDictionary(lang)
    const isZh = lang === 'zh'

    return (
        <div className="bg-paper min-h-screen">
            <section className="pt-24 pb-16 px-6 border-b border-line">
                <div className="max-w-6xl mx-auto">
                    <p className={`text-[10px] font-mono text-gray-500 mb-4 ${isZh ? 'tracking-normal' : 'tracking-[0.4em] uppercase'}`}>
                        {dict.journal.subtitle} / {dict.journal.guides}
                    </p>
                    <h1 className={`text-5xl md:text-7xl font-serif italic mb-8 ${isZh ? 'font-light' : 'font-normal'}`}>
                        {dict.journal.guides}
                    </h1>
                    <div className={`flex space-x-8 text-xs font-sans ${isZh ? 'tracking-normal' : 'tracking-widest uppercase'}`}>
                        <Link href={`/${lang}/journal`} className="hover:opacity-60 transition-opacity border-b border-transparent hover:border-ink pb-1">
                            {dict.journal.title}
                        </Link>
                        <Link href={`/${lang}/journal/team`} className="hover:opacity-60 transition-opacity border-b border-transparent hover:border-ink pb-1">
                            {dict.journal.team}
                        </Link>
                        <Link href={`/${lang}/journal/careers`} className="hover:opacity-60 transition-opacity border-b border-transparent hover:border-ink pb-1">
                            {dict.journal.careers}
                        </Link>
                        <Link href={`/${lang}/journal/guides`} className="opacity-100 border-b border-ink pb-1">
                            {dict.journal.guides}
                        </Link>
                    </div>
                </div>
            </section>
            <section className="py-24 text-center">
                <p className="font-mono text-gray-400">CONTENT COMING SOON</p>
            </section>
        </div>
    )
}
