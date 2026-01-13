"use client"

import { useCart } from '../lib/context/CartContext'

export default function AddToCartButton({ product, lang = 'en' }) {
    const { addToCart } = useCart()
    const isZh = lang === 'zh'

    // Safety check for product
    if (!product || !product.stripe_price_id) {
        return (
            <button
                disabled
                className="w-full border border-gray-300 px-8 py-3 text-xs font-mono tracking-[0.2em] text-gray-300 cursor-not-allowed"
            >
                {isZh ? '缺貨中' : 'UNAVAILABLE'}
            </button>
        )
    }

    const handleClick = () => {
        addToCart({
            id: product.id,
            name: isZh ? (product.name_zh || product.name_en) : product.name_en, // Handle localization storage in cart
            priceId: product.stripe_price_id,
            price: product.price || 0, // Should be passed or fetched. But since we use stripe checkout, maybe just display placeholder or fetch. Ideally we know the price.
            // For now let's assume price is purely for display in cart, actual checkout uses priceId.
            // Since we don't have price in DB easily without syncing, we might just use a solid default or fetch it.
            // But for this phase, Stripe checkout handles the actual total.
            // Let's assume passed product has a 'displayPrice' or we use a fallback.
            // Wait, we should probably add price to DB or fetch from Stripe.
            // Given "minimal checkout flow" and simplified DB, I'll assume we can pass a dummy price or derived price.
            // Or better, just don't show price sum in drawer if unknown? But drawer has subtotal.
            // Let's try to get price from props if available.
            volume: product.volume,
            formula_id: product.formula_id,
            image_url: product.image_url
        })
    }

    const isSoldOut = product.inventory_count === 0

    return (
        <button
            onClick={handleClick}
            disabled={isSoldOut}
            className={`w-full py-4 px-6 border border-ink font-mono text-xs uppercase tracking-[0.2em] transition-all
                ${isSoldOut
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'hover:bg-ink hover:text-paper text-ink'
                }
            `}
        >
            {isSoldOut ? (isZh ? '已售完' : 'SOLD OUT') : (isZh ? '加入購物車' : 'Add to Formulation')}
        </button>
    )
}
