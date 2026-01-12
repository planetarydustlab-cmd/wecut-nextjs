import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const dictionaries = {
    en: () => import('../../i18n/en.json').then((module) => module.default),
    zh: () => import('../../i18n/zh.json').then((module) => module.default),
}

export async function getDictionary(locale) {
    return dictionaries[locale]()
}

export default async function LangLayout({ children, params }) {
    const lang = params.lang || 'en'
    const dict = await getDictionary(lang)

    return (
        <>
            <Navbar lang={lang} dict={dict} />
            <main className="min-h-screen flex flex-col">
                {children}
            </main>
            <Footer lang={lang} dict={dict} />
        </>
    )
}
