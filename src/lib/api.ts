export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

import type {Product} from '../types/product'
import type {HeroSlide} from '../types/hero'
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

export const api = {
    listProducts: async (): Promise<Product[]> => {
        const isServer = typeof window === 'undefined'
        if (isServer && !API_BASE_URL) {
            return localProducts
        }
        return fetchJson<Product[]>('/api/products')
    },
    getProduct: async (slug: string): Promise<Product> => {
        const isServer = typeof window === 'undefined'
        if (isServer && !API_BASE_URL) {
            const p = localGetProductBySlug(slug)
            if (!p) throw new Error('Not found')
            return p
        }
        return fetchJson<Product>(`/api/products/${slug}`)
    },
    listHeroSlides: async (): Promise<HeroSlide[]> => {
        const isServer = typeof window === 'undefined'
        if (isServer && !API_BASE_URL) {
            return localHeroSlides
        }
        return fetchJson<HeroSlide[]>('/api/hero-slides')
    }
}
