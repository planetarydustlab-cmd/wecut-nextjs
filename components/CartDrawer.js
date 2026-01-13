"use client"

import { useCart } from '../lib/context/CartContext'
import Image from 'next/image'
// Using inline SVG icons instead of lucide-react
import { useState } from 'react'

// Simple Icons if lucide not installed, but usually it is in modern stacks.
// If not using lucide, I'll use SVGs.
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
const MinusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>

export default function CartDrawer({ lang = 'en' }) {
    const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity } = useCart()
    const [isCheckingOut, setIsCheckingOut] = useState(false)

    if (!isCartOpen) return null

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const isZh = lang === 'zh'

    const handleCheckout = async () => {
        setIsCheckingOut(true)
        try {
            const response = await fetch('/api/checkout_sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cartItems.map(item => ({
                        price: item.priceId,
                        quantity: item.quantity,
                        // Add inline details for robustness if priceId is invalid/dummy
                        name: item.name,
                        amount: item.price,
                        currency: 'aud', // Defaulting to AUD for Brisbane logic, or could use prop
                        image: item.image_url ? (item.image_url.startsWith('http') ? item.image_url : `${window.location.origin}${item.image_url}`) : undefined
                    })),
                    locale: lang
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Checkout failed')
            }

            if (data.url) {
                window.location.href = data.url
            } else {
                throw new Error('No checkout URL returned')
            }
        } catch (error) {
            console.error('Checkout error:', error)
            alert(`Checkout Error: ${error.message}`) // Simple alert for user feedback
            setIsCheckingOut(false)
        }
    }

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
                onClick={() => setIsCartOpen(false)}
            />

            {/* Drawer */}
            <div className={`fixed inset-y-0 right-0 w-full md:w-[480px] bg-[#FAFAF8] z-[70] border-l border-[#1A1A1A] transform transition-transform duration-300 ease-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-[#E5E5E5]">
                    <h2 className="font-mono text-sm tracking-widest uppercase">
                        {isZh ? '購物車' : 'Cart'} ({cartItems.length})
                    </h2>
                    <button onClick={() => setIsCartOpen(false)} className="hover:opacity-60">
                        <CloseIcon />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-6">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 font-mono text-xs">
                            <p>{isZh ? '您的購物車是空的' : 'YOUR CART IS EMPTY'}</p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="w-20 h-24 bg-gray-100 flex-shrink-0 relative grayscale">
                                        {/* Placeholder image if no image_url */}
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-300 bg-gray-50 border border-gray-200">
                                            {item.formula_id || 'IMG'}
                                        </div>
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="font-serif text-lg italic">{item.name}</h3>
                                                <p className="font-mono text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                            <p className="font-mono text-xs text-gray-500 mb-1">{item.volume} / {item.formula_id}</p>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center border border-[#1A1A1A]">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-2 hover:bg-gray-100"
                                                >
                                                    <MinusIcon />
                                                </button>
                                                <span className="font-mono text-xs w-8 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-2 hover:bg-gray-100"
                                                >
                                                    <PlusIcon />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-xs font-mono underline hover:no-underline text-gray-500"
                                            >
                                                {isZh ? '移除' : 'REMOVE'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="p-6 border-t border-[#E5E5E5] bg-[#FAFAF8]">
                        <div className="flex justify-between items-center mb-6 font-mono text-sm">
                            <span>{isZh ? '總計' : 'Subtotal'}</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            disabled={isCheckingOut}
                            className="w-full bg-[#1A1A1A] text-white py-4 font-mono text-xs tracking-[0.2em] hover:bg-opacity-90 disabled:opacity-50 transition-all uppercase"
                        >
                            {isCheckingOut
                                ? (isZh ? '處理中...' : 'Processing...')
                                : (isZh ? '前往結帳' : 'Checkout')
                            }
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}
