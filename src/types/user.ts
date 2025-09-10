export interface User {
    id?: string
    name: string
    email: string
    image?: string
    phone?: string
    birthDate?: string
    preferences?: {
        email: boolean
        sms: boolean
        push: boolean
    }
    createdAt?: string
    updatedAt?: string
}

export interface AuthContextValue {
    user: User | null
    isAuthenticated: boolean
    login: (user: User) => void
    logout: () => void
    updateUser: (updates: Partial<User>) => void
}
