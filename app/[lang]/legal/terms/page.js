import { createClient } from '../../../../lib/supabase/server'
import { cookies } from 'next/headers'

const dictionaries = {
    en: () => import('../../../../i18n/en.json').then((module) => module.default),
    zh: () => import('../../../../i18n/zh.json').then((module) => module.default),
}

async function getDictionary(locale) {
    return dictionaries[locale]()
}

export default async function Terms({ params }) {
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
                        {isZh ? '服務條款' : 'Terms of Service'}
                    </h1>
                    <p className="font-mono text-[10px] text-gray-400">
                        {isZh ? '最後更新：2024年1月' : 'LAST UPDATED: JANUARY 2024'}
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-sm font-sans text-gray-600 leading-relaxed space-y-8">
                    <section>
                        <h3 className="font-serif italic text-xl text-ink mb-4">1. {isZh ? '簡介' : 'Introduction'}</h3>
                        <p>
                            {isZh
                                ? '歡迎使用 WECUT GLOBAL (以下簡稱「本公司」) 的服務。使用本網站即表示您同意遵守以下條款。'
                                : 'Welcome to WECUT GLOBAL. By accessing or using our website and services, you agree to be bound by these Terms of Service.'}
                        </p>
                    </section>

                    <section>
                        <h3 className="font-serif italic text-xl text-ink mb-4">2. {isZh ? '預約與取消' : 'Appointments & Cancellations'}</h3>
                        <p>
                            {isZh
                                ? '我們保留隨時更改預約政策的權利。請參閱各分店的具體預約須知。'
                                : 'We reserve the right to modify our booking policies at any time. Please refer to individual location pages for specific booking terms.'}
                        </p>
                    </section>

                    <section>
                        <h3 className="font-serif italic text-xl text-ink mb-4">3. {isZh ? '智慧財產權' : 'Intellectual Property'}</h3>
                        <p>
                            {isZh
                                ? '本網站上的所有內容（包括文字、圖片、標誌）均為 WECUT GLOBAL 所有，未經許可不得使用。'
                                : 'All content on this website, including text, graphics, and logos, is the property of WECUT GLOBAL and may not be used without permission.'}
                        </p>
                    </section>

                    <section>
                        <h3 className="font-serif italic text-xl text-ink mb-4">4. {isZh ? '免責聲明' : 'Disclaimer'}</h3>
                        <p>
                            {isZh
                                ? '本網站按「現狀」提供，不保證無中斷或無錯誤。'
                                : 'The materials on WECUT GLOBAL website are provided on an "as is" basis.'
                            }
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
