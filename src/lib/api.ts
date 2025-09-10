export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

import type {
    Product,
    HeroSlide,
    Category,
    FAQ,
    Coupon,
    Order,
    Review,
    ApiResponse,
    PaginatedResponse
} from '@/types'
import {
    products as localProducts,
    getProductBySlug as localGetProductBySlug
} from './products'
import {heroSlides as localHeroSlides} from './heroSlides'

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${path}`
    const res = await fetch(url, {
        ...init,
        headers: {
            'content-type': 'application/json',
            ...(init?.headers || {})
        }
    })
    if (!res.ok) {
        const text = await res.text()
        throw new Error(`API ${res.status}: ${text}`)
    }
    return (await res.json()) as T
}

// Helper function to extract data from API response
function extractData<T>(response: ApiResponse<T>): T {
    if (!response.success || !response.data) {
        throw new Error(response.error || 'API request failed')
    }
    return response.data
}

export const api = {
    // Products
    listProducts: async (): Promise<Product[]> => {
        try {
            const response = await fetchJson<ApiResponse<Product[]>>(
                '/api/products'
            )
            return extractData(response)
        } catch (error) {
            // Fallback to local data if API fails
            return localProducts
        }
    },

    getProduct: async (slug: string): Promise<Product> => {
        try {
            const response = await fetchJson<ApiResponse<Product>>(
                `/api/products/${slug}`
            )
            return extractData(response)
        } catch (error) {
            // Fallback to local data if API fails
            const p = localGetProductBySlug(slug)
            if (!p) throw new Error('Product not found')
            return p
        }
    },

    // Hero Slides
    listHeroSlides: async (): Promise<HeroSlide[]> => {
        try {
            const response = await fetchJson<ApiResponse<HeroSlide[]>>(
                '/api/hero-slides'
            )
            return extractData(response)
        } catch (error) {
            // Fallback to local data if API fails
            return localHeroSlides
        }
    },

    // Categories
    listCategories: async (activeOnly = true): Promise<Category[]> => {
        const params = activeOnly ? '?active=true' : ''
        const response = await fetchJson<ApiResponse<Category[]>>(
            `/api/categories${params}`
        )
        return extractData(response)
    },

    // FAQ
    listFAQs: async (): Promise<FAQ[]> => {
        const response = await fetchJson<ApiResponse<FAQ[]>>('/api/faq')
        return extractData(response)
    },

    // Coupons
    listCoupons: async (userId?: string): Promise<Coupon[]> => {
        const params = userId ? `?userId=${userId}` : ''
        const response = await fetchJson<ApiResponse<Coupon[]>>(
            `/api/coupons${params}`
        )
        return extractData(response)
    },

    validateCoupon: async (
        code: string,
        totalAmount: number
    ): Promise<{
        coupon: Coupon
        discountAmount: number
        finalAmount: number
    }> => {
        const response = await fetchJson<
            ApiResponse<{
                coupon: Coupon
                discountAmount: number
                finalAmount: number
            }>
        >('/api/coupons', {
            method: 'POST',
            body: JSON.stringify({code, totalAmount})
        })
        return extractData(response)
    },

    // Orders
    listOrders: async (params?: {
        userId?: string
        status?: string
        page?: number
        limit?: number
    }): Promise<PaginatedResponse<Order>> => {
        const searchParams = new URLSearchParams()
        if (params?.userId) searchParams.set('userId', params.userId)
        if (params?.status) searchParams.set('status', params.status)
        if (params?.page) searchParams.set('page', params.page.toString())
        if (params?.limit) searchParams.set('limit', params.limit.toString())

        const url = `/api/orders${
            searchParams.toString() ? '?' + searchParams.toString() : ''
        }`
        return fetchJson<PaginatedResponse<Order>>(url)
    },

    createOrder: async (orderData: Partial<Order>): Promise<Order> => {
        const response = await fetchJson<ApiResponse<Order>>('/api/orders', {
            method: 'POST',
            body: JSON.stringify(orderData)
        })
        return extractData(response)
    },

    // Reviews
    listReviews: async (): Promise<Review[]> => {
        const response = await fetchJson<{reviews: Review[]}>('/api/reviews')
        return response.reviews
    },

    createReview: async (reviewData: {
        productId: string
        productName: string
        rating: number
        comment: string
        userId: string
    }): Promise<Review> => {
        const response = await fetchJson<{success: boolean; review: Review}>(
            '/api/reviews',
            {
                method: 'POST',
                body: JSON.stringify(reviewData)
            }
        )
        return response.review
    }
}
