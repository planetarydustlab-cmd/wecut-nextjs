import { NextResponse } from 'next/server'
import { stripe } from '../../../lib/stripe'
import { createClient } from '../../../lib/supabase/server'
import { cookies } from 'next/headers'

export async function POST(request) {
    try {
        const body = await request.json()
        const { items, priceId, quantity = 1, locale = 'en' } = body

        // Support both single item (legacy) and multi-item (cart)
        let line_items = []

        if (items && Array.isArray(items)) {
            line_items = items.map(item => {
                // If we have explicit price_data details (inline pricing), use them.
                // This is useful if the DB has dummy Stripe IDs or if we want to trust the cart price.
                // Standard check: proper Stripe Price IDs usually look like 'price_1P...' and are long.
                // Our dummy IDs like 'price_shampoo_01' will fail in live Stripe.
                const isDummyId = item.price && item.price.includes('price_') && item.price.length < 20

                if (item.name && item.amount !== undefined) {
                    return {
                        price_data: {
                            currency: item.currency || 'aud',
                            product_data: {
                                name: item.name,
                                images: item.image ? [item.image] : [],
                            },
                            unit_amount: Math.round(item.amount * 100), // Stripe expects cents
                        },
                        quantity: item.quantity,
                    }
                }

                // Fallback to Price ID if no inline data
                return {
                    price: item.price,
                    quantity: item.quantity
                }
            })
        } else if (priceId) {
            line_items = [{ price: priceId, quantity: quantity }]
        } else {
            return NextResponse.json({ error: 'Missing items or priceId' }, { status: 400 })
        }

        const session = await stripe.checkout.sessions.create({
            ui_mode: 'hosted',
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${request.headers.get('origin')}/${locale}/shop?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${request.headers.get('origin')}/${locale}/shop?canceled=true`,
            metadata: {
                // Add any internal tracking metadata here
            },
        })

        return NextResponse.json({ sessionId: session.id, url: session.url })
    } catch (err) {
        console.error('Error creating checkout session:', err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
