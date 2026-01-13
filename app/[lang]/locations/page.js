import Link from 'next/link'
import { cookies } from 'next/headers'
import { createClient } from '../../../lib/supabase/server'

const dictionaries = {
    en: () => import('../../../i18n/en.json').then((module) => module.default),
    zh: () => import('../../../i18n/zh.json').then((module) => module.default),
}

async function getDictionary(locale) {
    return dictionaries[locale]()
}

export const dynamic = 'force-dynamic';

export default async function Locations({ params }) {
    const lang = params.lang || 'en'
    const dict = await getDictionary(lang)
    const isZh = lang === 'zh'
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data: locations } = await supabase
        .from('locations')
        .select('*')
        .order('name_en', { ascending: true })

    // Force Melbourne (AU/Brisbane) first (Origin), then Taipei
    const sortedLocations = locations?.sort((a, b) => {
        if (a.slug === 'brisbane') return -1;
        if (b.slug === 'brisbane') return 1;
        return 0;
    }) || [];

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
                    {sortedLocations.map((location, index) => (
                        <div key={location.id} className={`p-8 md:p-12 ${index === 0 ? 'border-b md:border-b-0 border-line' : ''}`}>
                            {(() => {
                                const isBrisbane = location.slug === 'brisbane';
                                const countryName = location.country_code === 'TW' ? (isZh ? '台灣' : 'Taiwan') : (isZh ? '澳洲' : 'Australia');
                                const cityDisplay = location.city_display || (isBrisbane ? 'Brisbane' : 'Taipei');
                                // ^ Fallback if DB column empty, though migration should have filled it.

                                // Construct hours object from DB columns
                                const hours = {
                                    mon: location.hours_mon,
                                    tue: location.hours_tue,
                                    wed: location.hours_wed,
                                    thu: location.hours_thu,
                                    fri: location.hours_fri,
                                    sat: location.hours_sat,
                                    sun: location.hours_sun,
                                };

                                // Check if hours exist (at least one day is not null/closed/TBD?)
                                // Simple check: if hours_mon is null or empty, assume TBD or check explicit TBD flag?
                                // For now, relies on the fact that migration populated strings 'Closed', time ranges, etc.
                                // If specific value "TBD" or null, we treat as TBD.
                                const hasHours = Object.values(hours).some(h => h && h !== 'null');

                                const renderHours = () => {
                                    if (!hasHours || (!location.hours_mon && location.country_code === 'TW')) {
                                        // Special case for TW if data missing/just created, but migration filled 'Closed'/'12:00-21:00'
                                        // If DB has data, render it.
                                    }

                                    // If strictly no data
                                    if (!hasHours) {
                                        return (
                                            <p className="text-xs text-gray-400 font-mono mt-4">
                                                {isZh ? '營業時間待確認' : 'Opening hours TBD'}
                                            </p>
                                        );
                                    }

                                    return (
                                        <div className="flex flex-col gap-1 mt-4">
                                            {Object.entries(hours).map(([day, time]) => (
                                                time && (
                                                    <div key={day} className="flex justify-between text-xs text-gray-500 font-mono w-48">
                                                        <span>{day.toUpperCase()}</span>
                                                        <span>{time}</span>
                                                    </div>
                                                )
                                            ))}
                                        </div>
                                    );
                                };

                                return (
                                    <>
                                        <div className="flex justify-between items-start mb-8">
                                            <p className={`text-[10px] font-sans text-gray-500 ${isZh ? 'tracking-normal' : 'tracking-[0.3em] uppercase'}`}>
                                                {String(index + 1).padStart(2, '0')}. {isBrisbane ? dict.locations.origin : dict.locations.expansion}
                                            </p>
                                            <span className="text-[10px] font-mono text-gray-400">
                                                {location.city_code || (isBrisbane ? 'BNE' : 'TPE')}
                                            </span>
                                        </div>

                                        <div className="h-64 bg-gray-200 mb-8 overflow-hidden rounded-none">
                                            <img
                                                src={location.image_url || "/wecut_australia_location.png"}
                                                alt={`${location.name_en} Interior`}
                                                className="w-full h-full object-cover grayscale"
                                            />
                                        </div>

                                        <h2 className={`text-3xl font-serif italic mb-2 ${isZh ? 'font-light' : 'font-normal'}`}>
                                            {/* Force English Title as per user request */}
                                            {location.name_display}
                                        </h2>
                                        <p className={`text-[10px] font-sans text-gray-500 mb-8 tracking-[0.3em] uppercase`}>
                                            {/* Force English Subtitle as per user request */}
                                            {location.city_display || (isBrisbane ? 'Brisbane' : 'Taipei')} {location.country_code === 'TW' ? 'TAIWAN' : 'AUSTRALIA'}
                                        </p>

                                        <div className="border-l-2 border-ink pl-4 mb-8">
                                            <p className="font-mono text-sm mb-1">
                                                {isZh ? (location.address_zh || location.address_display) : (location.address_display || location.address_en)}
                                                {/* Fallback to address_display (strict/new) or address_en (old) */}
                                            </p>
                                            {renderHours()}
                                        </div>

                                        <p className={`font-serif italic text-gray-600 mb-8 ${isZh ? 'font-light leading-loose' : ''}`}>
                                            {isBrisbane
                                                ? (isZh ? '起源之地。粗獷的紋理與海岸的光線在此相遇。' : 'The foundation. Where raw textures meet coastal light.')
                                                : (isZh ? '進化之地。都市的精準與亞洲紋理在此交融。' : 'The evolution. Urban precision meets Asian texture.')
                                            }
                                        </p>

                                        <div className="flex items-center justify-between pt-6 border-t border-line">
                                            <p className="font-mono text-[10px] text-gray-400">
                                                {isBrisbane ? '27.5339° S, 153.0833° E' : '25.0330° N, 121.5654° E'}
                                            </p>
                                            {location.booking_url ? (
                                                <a
                                                    href={location.booking_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`text-[10px] font-sans border border-ink px-4 py-2 hover:bg-ink hover:text-paper transition-colors rounded-none ${isZh ? 'tracking-normal' : 'uppercase tracking-[0.2em]'}`}
                                                >
                                                    {dict.locations.book_now}
                                                </a>
                                            ) : (
                                                <span className={`text-[10px] font-sans border border-ink px-4 py-2 rounded-none ${isZh ? 'tracking-normal' : 'uppercase tracking-[0.2em]'}`}>
                                                    {dict.locations.walk_in}
                                                </span>
                                            )}
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
