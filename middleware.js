import { NextResponse } from 'next/server'

const locales = ['en', 'zh']
const defaultLocale = 'en'

function getLocale(request) {
    // Check for existing locale in path
    const pathname = request.nextUrl.pathname
    const pathnameLocale = locales.find(
        locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )
    if (pathnameLocale) return pathnameLocale

    // Check Accept-Language header
    const acceptLanguage = request.headers.get('Accept-Language') || ''
    if (acceptLanguage.includes('zh')) return 'zh'

    return defaultLocale
}

export function middleware(request) {
    const pathname = request.nextUrl.pathname

    // Skip static files and API routes
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/admin') ||
        pathname.startsWith('/auth') ||
        pathname.includes('.') // files with extensions
    ) {
        return NextResponse.next()
    }

    // Check if pathname already has locale
    const pathnameHasLocale = locales.some(
        locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) return NextResponse.next()

    // Redirect to locale-prefixed path
    const locale = getLocale(request)
    return NextResponse.redirect(
        new URL(`/${locale}${pathname}`, request.url)
    )
}

export const config = {
    matcher: ['/((?!_next|api|.*\\..*).*)'],
}
