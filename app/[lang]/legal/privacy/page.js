import { createClient } from '../../../../lib/supabase/server'
import { cookies } from 'next/headers'

const dictionaries = {
    en: () => import('../../../../i18n/en.json').then((module) => module.default),
    zh: () => import('../../../../i18n/zh.json').then((module) => module.default),
}

async function getDictionary(locale) {
    return dictionaries[locale]()
}

export default async function Privacy({ params }) {
    const lang = params.lang || 'en'
    const dict = await getDictionary(lang)
    const isZh = lang === 'zh'

    return (
        <div className="bg-paper min-h-screen pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-16 border-b border-gray-300 pb-8">
                    <p className="font-mono text-[10px] text-gray-500 mb-4 tracking-widest uppercase">
                        {isZh ? '法律聲明' : 'LEGAL'}
                    </p>
                    <h1 className="font-serif text-3xl md:text-5xl italic mb-4">
                        {isZh ? '隱私權政策' : 'Privacy Policy'}
                    </h1>
                    <p className="font-mono text-[10px] text-gray-400">
                        {isZh ? '最後更新：2024年1月' : 'LAST UPDATED: JANUARY 2024'}
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-sm font-sans text-gray-600 leading-relaxed space-y-8">
                    <section>
                        <h3 className="font-serif italic text-xl text-ink mb-4">1. {isZh ? '資料收集' : 'Data Collection'}</h3>
                        <p>
                            {isZh
                                ? '我們可能會收集您的姓名、電子郵件地址和其他聯繫資訊，以便為您提供服務。'
                                : 'We collect personal information that you provide to us such as name, email address, and contact details to provide our services.'}
                        </p>
                    </section>

                    <section>
                        <h3 className="font-serif italic text-xl text-ink mb-4">2. {isZh ? '資料使用' : 'Use of Information'}</h3>
                        <p>
                            {isZh
                                ? '我們使用收集的資訊來處理預約、發送電子報（如您已訂閱）以及改善我們的服務。'
                                : 'We use the information we collect to process bookings, send newsletters (if subscribed), and improve our services.'}
                        </p>
                    </section>

                    <section>
                        <h3 className="font-serif italic text-xl text-ink mb-4">3. {isZh ? 'Cookies' : 'Cookies'}</h3>
                        <p>
                            {isZh
                                ? '本網站使用 Cookies 來改善您的瀏覽體驗。'
                                : 'This website uses cookies to enhance your browsing experience.'}
                        </p>
                    </section>

                    <section>
                        <h3 className="font-serif italic text-xl text-ink mb-4">4. {isZh ? '聯繫我們' : 'Contact Us'}</h3>
                        <p>
                            {isZh
                                ? '如果您對本隱私政策有任何疑問，請聯繫：info@wecut.global'
                                : 'If you have any questions about this Privacy Policy, please contact us at info@wecut.global'}
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
