'use client'

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react'
import type {CartItem} from '../types/product'
import {getProductById} from '../lib/products'

type CartContextValue = {
    items: CartItem[]
    addToCart: (productId: string, quantity?: number) => void
    removeFromCart: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
    totalItems: number
    subtotalCents: number
    isCartOpen: boolean
    openCart: () => void
    closeCart: () => void
    toggleCart: () => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

const STORAGE_KEY = 'ailika_cart_v1'

export function CartProvider({children}: {children: React.ReactNode}) {
    const [items, setItems] = useState<CartItem[]>([])
    const [isCartOpen, setIsCartOpen] = useState(false)

    // Load from localStorage
    useEffect(() => {
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY)
            if (raw) {
                const parsed = JSON.parse(raw) as CartItem[]
                setItems(parsed.filter(it => getProductById(it.productId)))
            }
        } catch {
            // ignore
        }
    }, [])

    // Persist to localStorage
    useEffect(() => {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
        } catch {
            // ignore
        }
    }, [items])

    // Auto-clear cart if returning from a successful payment (status=paid)
    useEffect(() => {
        if (typeof window === 'undefined') return
        try {
            const url = new URL(window.location.href)
            if (url.searchParams.get('status') === 'paid') {
                setItems([])
                url.searchParams.delete('status')
                window.history.replaceState(null, '', url.toString())
            }
        } catch {
            // ignore
        }
    }, [])

    const addToCart = useCallback((productId: string, quantity: number = 1) => {
        setItems(prev => {
            const existing = prev.find(it => it.productId === productId)
            if (existing) {
                return prev.map(it =>
                    it.productId === productId
                        ? {...it, quantity: it.quantity + quantity}
                        : it
                )
            }
            return [...prev, {productId, quantity}]
        })
    }, [])

    const removeFromCart = useCallback((productId: string) => {
        setItems(prev => prev.filter(it => it.productId !== productId))
    }, [])

    const updateQuantity = useCallback(
        (productId: string, quantity: number) => {
            setItems(prev => {
                if (quantity <= 0)
                    return prev.filter(it => it.productId !== productId)
                return prev.map(it =>
                    it.productId === productId ? {...it, quantity} : it
                )
            })
        },
        []
    )

    const clearCart = useCallback(() => setItems([]), [])

    const openCart = useCallback(() => setIsCartOpen(true), [])
    const closeCart = useCallback(() => setIsCartOpen(false), [])
    const toggleCart = useCallback(() => setIsCartOpen(prev => !prev), [])

    const totalItems = useMemo(
        () => items.reduce((sum, it) => sum + it.quantity, 0),
        [items]
    )

    const subtotalCents = useMemo(() => {
        return items.reduce((sum, it) => {
            const product = getProductById(it.productId)
            if (!product) return sum
            return sum + product.price * it.quantity
        }, 0)
    }, [items])

    const value: CartContextValue = {
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotalCents,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error('useCart must be used within CartProvider')
    return ctx
}

export function formatCents(cents: number): string {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY'
    }).format(cents / 100)
}
