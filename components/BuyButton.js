'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function BuyButton({ priceId, label = 'Buy Now', isZh = false }) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleCheckout = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/checkout_sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    priceId,
                    quantity: 1,
                    locale: isZh ? 'zh' : 'en' // Pass locale to API for redirect URL
                }),
            })

            const { url, error } = await response.json()

            if (error) {
                console.error('Checkout error:', error)
                alert('Checkout failed. Please try again.')
                setLoading(false)
                return
            }

            if (url) {
                window.location.href = url
            }
        } catch (err) {
            console.error('Checkout error:', err)
            alert('An unexpected error occurred.')
            setLoading(false)
        }
    }

    return (
        <button
            onClick={handleCheckout}
            disabled={loading}
            className={`
        w-full py-4 px-8 
        border border-ink 
        font-mono text-xs uppercase tracking-[0.2em] 
        transition-all duration-300
        hover:bg-ink hover:text-paper
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
        >
            {loading ? (isZh ? '處理中...' : 'PROCESSING...') : label}
        </button>
    )
}
