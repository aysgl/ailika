'use client'

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react'

import type {User, AuthContextValue} from '@/types'

const STORAGE_KEY = 'ailika_auth_user_v1'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({children}: {children: React.ReactNode}) {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY)
            if (raw) setUser(JSON.parse(raw) as User)
        } catch {
            // ignore
        }
    }, [])

    useEffect(() => {
        try {
            if (user) {
                window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
            } else {
                window.localStorage.removeItem(STORAGE_KEY)
            }
        } catch {
            // ignore
        }
    }, [user])

    const login = useCallback((u: User) => setUser(u), [])
    const logout = useCallback(() => setUser(null), [])
    const updateUser = useCallback((updates: Partial<User>) => {
        setUser(prev => (prev ? {...prev, ...updates} : prev))
    }, [])

    const value: AuthContextValue = useMemo(
        () => ({user, isAuthenticated: !!user, login, logout, updateUser}),
        [user, login, logout, updateUser]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within AuthProvider')
    return ctx
}
