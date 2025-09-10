'use client'

import {useQuery, useQueryClient} from '@tanstack/react-query'
import {api} from '../lib/api'

// Query keys for consistent caching
export const productKeys = {
    all: ['products'] as const,
    lists: () => [...productKeys.all, 'list'] as const,
    list: (filters: Record<string, unknown>) =>
        [...productKeys.lists(), {filters}] as const,
    details: () => [...productKeys.all, 'detail'] as const,
    detail: (slug: string) => [...productKeys.details(), slug] as const
}

// Hook to fetch all products
export function useProducts() {
    return useQuery({
        queryKey: productKeys.lists(),
        queryFn: () => api.listProducts(),
        staleTime: 5 * 60 * 1000 // 5 minutes
    })
}

// Hook to fetch a single product by slug
export function useProduct(slug: string) {
    return useQuery({
        queryKey: productKeys.detail(slug),
        queryFn: () => api.getProduct(slug),
        enabled: !!slug, // Only run if slug exists
        staleTime: 10 * 60 * 1000 // 10 minutes for individual products
    })
}

// Hook to prefetch a product (useful for hover effects)
export function usePrefetchProduct() {
    const queryClient = useQueryClient()

    return (slug: string) => {
        queryClient.prefetchQuery({
            queryKey: productKeys.detail(slug),
            queryFn: () => api.getProduct(slug),
            staleTime: 10 * 60 * 1000
        })
    }
}

// Hook to invalidate product queries (useful after mutations)
export function useInvalidateProducts() {
    const queryClient = useQueryClient()

    return {
        invalidateAll: () =>
            queryClient.invalidateQueries({queryKey: productKeys.all}),
        invalidateList: () =>
            queryClient.invalidateQueries({queryKey: productKeys.lists()}),
        invalidateProduct: (slug: string) =>
            queryClient.invalidateQueries({queryKey: productKeys.detail(slug)})
    }
}
