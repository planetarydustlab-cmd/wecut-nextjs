'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar({ lang = 'en', dict }) {
    const [menuOpen, setMenuOpen] = useState(false)
    const isZh = lang === 'zh'
    const t = dict?.nav || { shop: 'SHOP', locations: 'LOCATIONS', about: 'ABOUT', search: 'SEARCH', cart: 'CART' }

    return (
        <>
            <nav className="sticky top-0 z-50 bg-paper border-b border-line px-6 py-4 flex justify-between items-center bg-opacity-98 backdrop-blur-sm">
                {/* Left: Logo */}
                <div className="flex-1">
                    <Link href={`/${lang}`} className="text-xl font-serif font-bold tracking-tighter hover:opacity-70 transition-opacity">
                        WECUT.
                    </Link>
                </div>

                {/* Center: Desktop Links */}
                <div className={`hidden md:flex space-x-10 text-xs font-sans font-normal ${isZh ? 'tracking-normal' : 'tracking-wide uppercase'}`}>
                    <Link href={`/${lang}/shop`} className="hover:opacity-60 transition-opacity">
                        {t.shop}
                    </Link>
                    <Link href={`/${lang}/locations`} className="hover:opacity-60 transition-opacity">
                        {t.locations}
                    </Link>
                    <Link href={`/${lang}/about`} className="hover:opacity-60 transition-opacity">
                        {t.about}
                    </Link>
                </div>

                {/* Right: Actions + Language Switcher */}
                <div className={`flex-1 flex justify-end items-center space-x-6 text-xs font-sans ${isZh ? 'tracking-normal' : 'uppercase'}`}>
                    {/* Language Switcher */}
                    <Link
                        href={lang === 'en' ? '/zh' : '/en'}
                        className="hidden md:inline cursor-pointer hover:opacity-60 transition-opacity border border-ink px-2 py-1 text-[10px]"
                    >
                        {lang === 'en' ? '中文' : 'EN'}
                    </Link>
                    <span className="hidden md:inline cursor-pointer hover:opacity-60 transition-opacity">{t.search}</span>
                    <span className="cursor-pointer hover:opacity-60 transition-opacity">{t.cart} (0)</span>
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden border border-ink px-3 py-1 text-[10px] hover:bg-ink hover:text-paper transition-colors"
                    >
                        MENU
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {menuOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-paper">
                    <div className="flex flex-col items-center justify-center h-full space-y-8">
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="absolute top-6 right-6 border border-ink px-3 py-1 text-[10px]"
                        >
                            CLOSE
                        </button>

                        {/* Language Switcher Mobile */}
                        <Link
                            href={lang === 'en' ? '/zh' : '/en'}
                            onClick={() => setMenuOpen(false)}
                            className="text-sm font-mono border border-ink px-4 py-2"
                        >
                            {lang === 'en' ? '切換中文' : 'Switch to EN'}
                        </Link>

                        <Link
                            href={`/${lang}/shop`}
                            onClick={() => setMenuOpen(false)}
                            className="text-2xl font-serif italic hover:opacity-60 transition-opacity"
                        >
                            {isZh ? '選購' : 'Shop'}
                        </Link>
                        <Link
                            href={`/${lang}/locations`}
                            onClick={() => setMenuOpen(false)}
                            className="text-2xl font-serif italic hover:opacity-60 transition-opacity"
                        >
                            {isZh ? '門市' : 'Locations'}
                        </Link>
                        <Link
                            href={`/${lang}/about`}
                            onClick={() => setMenuOpen(false)}
                            className="text-2xl font-serif italic hover:opacity-60 transition-opacity"
                        >
                            {isZh ? '關於' : 'About'}
                        </Link>
                    </div>
                </div>
            )}
        </>
    )
}
