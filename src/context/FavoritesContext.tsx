'use client'

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react'

type FavoritesContextValue = {
    favorites: string[]
    isFavorite: (productId: string) => boolean
    addFavorite: (productId: string) => void
    removeFavorite: (productId: string) => void
    toggleFavorite: (productId: string) => void
    count: number
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
    undefined
)

const STORAGE_KEY = 'ailika_favorites_v1'

export function FavoritesProvider({children}: {children: React.ReactNode}) {
    const [favorites, setFavorites] = useState<string[]>([])

    useEffect(() => {
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY)
            if (raw) {
                const parsed = JSON.parse(raw) as string[]
                setFavorites(Array.isArray(parsed) ? parsed : [])
            }
        } catch {
            // ignore
        }
    }, [])

    useEffect(() => {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
        } catch {
            // ignore
        }
    }, [favorites])

    const addFavorite = useCallback((productId: string) => {
        setFavorites(prev =>
            prev.includes(productId) ? prev : [...prev, productId]
        )
    }, [])

    const removeFavorite = useCallback((productId: string) => {
        setFavorites(prev => prev.filter(id => id !== productId))
    }, [])

    const toggleFavorite = useCallback((productId: string) => {
        setFavorites(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        )
    }, [])

    const isFavorite = useCallback(
        (productId: string) => favorites.includes(productId),
        [favorites]
    )

    const count = useMemo(() => favorites.length, [favorites])

    const value: FavoritesContextValue = {
        favorites,
        isFavorite,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        count
    }

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    )
}

export function useFavorites() {
    const ctx = useContext(FavoritesContext)
    if (!ctx)
        throw new Error('useFavorites must be used within FavoritesProvider')
    return ctx
}
