import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'

// Initialized lazily inside handlers to prevent build-time errors if env vars are missing
const getSupabaseAdmin = () => {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    )
}

export async function POST(req) {
    const body = await req.text()
    const sig = req.headers.get('stripe-signature')
    let event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch (err) {
        console.error(`Webhook signature verification failed.`, err.message)
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object
            await handleCheckoutSessionCompleted(session)
            break
        default:
            console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({ received: true })
}

async function handleCheckoutSessionCompleted(session) {
    const { id: stripe_checkout_session_id, customer: stripe_customer_id, amount_total, currency, payment_intent } = session

    const supabaseAdmin = getSupabaseAdmin()

    // 1. Upsert Customer
    const { data: customerData, error: customerError } = await supabaseAdmin
        .from('customers')
        .upsert({
            stripe_customer_id: typeof stripe_customer_id === 'string' ? stripe_customer_id : session.customer_details.email, // Fallback if guest
            email: session.customer_details.email,
            name: session.customer_details.name
        }, { onConflict: 'stripe_customer_id' })
        .select('id')
        .single()

    if (customerError) {
        console.error('Error upserting customer:', customerError)
        return
    }

    // 2. Insert Order
    const { data: orderData, error: orderError } = await supabaseAdmin
        .from('orders')
        .insert({
            stripe_checkout_session_id,
            customer_id: customerData.id,
            amount_total,
            currency,
            status: session.payment_status,
            payment_intent_id: typeof payment_intent === 'string' ? payment_intent : undefined
        })
        .select('id')
        .single()

    if (orderError) {
        console.error('Error inserting order:', orderError)
        return
    }

    // 3. Insert Items
    // Note: Session items are not expanded by default in the webhook payload for checkout.session.completed
    // We need to fetch line items from Stripe
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id)

    const itemsToInsert = lineItems.data.map(item => ({
        order_id: orderData.id,
        stripe_product_id: item.price.product,
        stripe_price_id: item.price.id,
        quantity: item.quantity,
        amount_total: item.amount_total
    }))

    const { error: itemsError } = await supabaseAdmin.from('order_items').insert(itemsToInsert)

    if (itemsError) {
        console.error('Error inserting order items:', itemsError)
    }
}
