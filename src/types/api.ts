// Common API response types
export interface ApiResponse<T> {
    data?: T
    error?: string
    message?: string
    success: boolean
}

export interface PaginatedResponse<T> {
    data: T[]
    pagination: {
        page: number
        limit: number
        total: number
        totalPages: number
    }
}

// API Error types
export interface ApiError {
    message: string
    code?: string
    details?: Record<string, unknown>
}
