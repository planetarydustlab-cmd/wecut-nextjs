"use client"

import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([])
    const [isCartOpen, setIsCartOpen] = useState(false)

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('wecut_cart')
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart))
            } catch (e) {
                console.error("Failed to parse cart", e)
            }
        }
    }, [])

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('wecut_cart', JSON.stringify(cartItems))
    }, [cartItems])

    const addToCart = (product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id)
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
            return [...prev, { ...product, quantity: 1 }]
        })
        setIsCartOpen(true)
    }

    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => item.id !== productId))
    }

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) {
            removeFromCart(productId)
            return
        }
        setCartItems(prev =>
            prev.map(item =>
                item.id === productId
                    ? { ...item, quantity }
                    : item
            )
        )
    }

    const clearCart = () => {
        setCartItems([])
        localStorage.removeItem('wecut_cart')
    }

    return (
        <CartContext.Provider value={{
            cartItems,
            isCartOpen,
            setIsCartOpen,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext)
}
