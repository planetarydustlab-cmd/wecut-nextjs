import { NextResponse } from 'next/server'

// MOCK DATA for now. 
// To fetch real GA4:
// 1. Install @google-analytics/data
// 2. Setup Service Account & Enable Analytics API
// 3. Authenticate and query runReport()

export async function GET() {
    // Simulate API delay
    // await new Promise(resolve => setTimeout(resolve, 500))

    // Real implementation would look like:
    // const [response] = await analyticsDataClient.runReport({...})

    return NextResponse.json({
        visitorsToday: Math.floor(Math.random() * 50) + 120,
        viewsMonth: Math.floor(Math.random() * 500) + 4200,
        source: 'mock' // 'ga4' when connected
    })
}
