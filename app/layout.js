import { Inter, Bodoni_Moda, JetBrains_Mono, Noto_Serif_TC, Noto_Sans_TC } from 'next/font/google'
import '../styles/globals.css'
import { CartProvider } from '../lib/context/CartContext'
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

const bodoni = Bodoni_Moda({
    subsets: ['latin'],
    variable: '--font-bodoni',
    display: 'swap',
    style: ['normal', 'italic'],
    weight: ['400', '500', '600', '700'],
    adjustFontFallback: false,
})

const jetbrains = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains',
    display: 'swap',
})

const notoSerifTC = Noto_Serif_TC({
    subsets: ['latin'],
    weight: ['300', '400', '600'],
    variable: '--font-noto-serif',
    display: 'swap',
})

const notoSansTC = Noto_Sans_TC({
    subsets: ['latin'],
    weight: ['300', '400'],
    variable: '--font-noto-sans',
    display: 'swap',
})

export const metadata = {
    title: 'WECUT Global Labs',
    description: 'Precision & Texture.',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${inter.variable} ${bodoni.variable} ${jetbrains.variable} ${notoSerifTC.variable} ${notoSansTC.variable}`}>
            <body className="bg-[#FAFAF8] text-[#1A1A1A] antialiased selection:bg-[#E2E2E2] selection:text-black">
                <CartProvider>
                    {children}
                </CartProvider>
            </body>
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-PLACEHOLDER"} />
        </html>
    )
}
