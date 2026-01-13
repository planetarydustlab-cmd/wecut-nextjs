import Link from 'next/link'
import { VERIFIED_FACTS } from '../lib/verified-facts'

export default function Footer({ lang = 'en', dict }) {
    const isZh = lang === 'zh'
    const t = dict?.footer || { contact: 'CONTACT', locations: 'LOCATIONS', social: 'SOCIAL', newsletter: 'NEWSLETTER', join: 'JOIN', terms: 'TERMS', privacy: 'PRIVACY' }

    return (
        <footer className="bg-ink text-paper">
            {/* Main Footer Grid */}
            <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">

                {/* CONTACT */}
                <div>
                    <h4 className={`text-[10px] font-sans mb-6 opacity-60 ${isZh ? 'tracking-normal' : 'tracking-[0.3em] uppercase'}`}>
                        {t.contact}
                    </h4>
                    <p className="font-mono text-sm mb-2">info@wecut.global</p>
                    <p className="font-sans text-xs text-gray-400 mt-4">
                        {isZh ? '預約請至門市頁面。' : 'For bookings, please use the Locations page.'}
                    </p>
                </div>

                {/* LOCATIONS */}
                <div>
                    <h4 className={`text-[10px] font-sans mb-6 opacity-60 ${isZh ? 'tracking-normal' : 'tracking-[0.3em] uppercase'}`}>
                        {t.locations}
                    </h4>
                    <Link href={`/${lang}/locations`} className="block font-mono text-sm mb-2 hover:opacity-60 transition-opacity">
                        Brisbane
                    </Link>
                    <Link href={`/${lang}/locations`} className="block font-mono text-sm hover:opacity-60 transition-opacity">
                        Taipei
                    </Link>
                </div>

                {/* SOCIAL */}
                <div>
                    <h4 className={`text-[10px] font-sans mb-6 opacity-60 ${isZh ? 'tracking-normal' : 'tracking-[0.3em] uppercase'}`}>
                        {t.social}
                    </h4>
                    {/* Only show verified Instagram links */}
                    <a
                        href="https://www.instagram.com/wecut.tw/?hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block font-mono text-sm mb-2 hover:opacity-60 transition-opacity"
                    >
                        Instagram (TW)
                    </a>
                    {VERIFIED_FACTS.social.instagram_au && (
                        <a
                            href={VERIFIED_FACTS.social.instagram_au}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block font-mono text-sm hover:opacity-60 transition-opacity"
                        >
                            Instagram (AU)
                        </a>
                    )}
                </div>

                {/* NEWSLETTER */}
                <div>
                    <h4 className={`text-[10px] font-sans mb-6 opacity-60 ${isZh ? 'tracking-normal' : 'tracking-[0.3em] uppercase'}`}>
                        {t.newsletter}
                    </h4>
                    <div className="flex border-b border-gray-600">
                        <input
                            type="email"
                            placeholder={isZh ? '輸入電子郵件' : 'ENTER EMAIL'}
                            className={`bg-transparent text-sm font-sans flex-1 py-2 outline-none placeholder:text-gray-500 ${isZh ? '' : 'uppercase'}`}
                        />
                        <button className={`text-[10px] font-sans px-4 hover:opacity-60 transition-opacity ${isZh ? 'tracking-normal' : 'tracking-[0.2em] uppercase'}`}>
                            {t.join}
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700">
                <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-gray-500">
                    <p>© 2024 WECUT GLOBAL.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href={`/${lang}/legal/terms`} className="hover:text-paper cursor-pointer transition-colors">
                            {t.terms}
                        </Link>
                        <Link href={`/${lang}/legal/privacy`} className="hover:text-paper cursor-pointer transition-colors">
                            {t.privacy}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
