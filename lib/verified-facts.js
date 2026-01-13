/**
 * VERIFIED FACTS — SINGLE SOURCE OF TRUTH
 * 
 * Derived from:
 * - WECUT_TW_verified_facts.md
 * - WECUT_AU_verified_facts.md
 * 
 * NOTE: The frontend should prioritize Supabase DB ('locations' table) over this file.
 * This file serves as a reference backup and initial seed source.
 */

export const VERIFIED_FACTS = {
    identity: {
        name_tw: "WECUT惟理髮",
        name_au: "WECUT",
    },
    locations: {
        // === TAIWAN ===
        // Source: WECUT_TW_verified_facts.md
        taipei: {
            slug: 'taipei',
            name_en: "WECUT",
            name_zh: "WECUT惟理髮",

            // Strictly from MD Publishable section (Fresha source)
            address_full_en: "Lane 202, Longan Road 51, New Taipei City",
            address_full_zh: null, // Not in Publishable section
            source_address_string: "Lane 202, Longan Road 51, New Taipei City",

            // Strictly from MD Publishable section (User Edit)
            opening_hours: {
                mon: "Closed",
                tue: "Closed",
                wed: "12:00-21:00",
                thu: "12:00-21:00",
                fri: "12:00-21:00",
                sat: "11:00-20:00",
                sun: "11:00-20:00"
            },
            hours_summary_en: "Mon Closed; Tue Closed; Wed 10:00–21:00; Thu 12:00–21:00; Fri 10:00–21:00; Sat 10:00–20:00; Sun 11:00–21:00",
            hours_summary_zh: "週一 公休；週二 公休；週三 10:00–21:00；週四 12:00–21:00；週五 10:00–21:00；週六 10:00–20:00；週日 11:00–21:00",

            booking_url: "https://www.fresha.com/a/wecutwei-li-fa-new-taipei-city-lane-202-longan-road-51-gn35q6d0/all-offer?venue=true"
        },
        // === AUSTRALIA ===
        // Source: WECUT_AU_verified_facts.md
        brisbane: {
            slug: 'brisbane',
            name_en: "WECUT",
            name_zh: "WECUT",
            // Strictly from MD Publishable section (Verified) address)
            address_full_en: "Cnr Creek & Logan Rds, Mt Gravatt QLD 4122, Australia",
            address_full_zh: "Cnr Creek & Logan Rds, Mt Gravatt QLD 4122, Australia", // Fallback
            source_address_string: "Cnr Creek & Logan Rds, Mt Gravatt QLD 4122, Australia",

            // Strictly from MD Publishable section (Centre trading hours)
            opening_hours: {
                mon: "09:00-17:30",
                tue: "09:00-17:30",
                wed: "09:00-17:30",
                thu: "09:00-17:30",
                fri: "09:00-17:30",
                sat: "09:00-17:00",
                sun: "09:00-17:00"
            },
            hours_summary_en: "Mon–Fri 9:00am–5:30pm; Sat–Sun 9:00am–5:00pm",
            hours_summary_zh: "週一至週五 9:00am–5:30pm; 週六週日 9:00am–5:00pm",

            booking_url: null
        }
    },
    social: {
        instagram_tw: null, // Not in Publishable section
        instagram_au: "https://www.instagram.com/wecut_express/?hl=en"
    },
    contact: {
        email: "info@wecut.global" // Standard contact
    }
}
