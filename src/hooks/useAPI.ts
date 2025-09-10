'use client'

import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import {api} from '../lib/api'
import type {Order} from '../types'

// Query keys for consistent caching
export const apiKeys = {
    heroSlides: ['hero-slides'] as const,
    categories: (activeOnly?: boolean) => ['categories', {activeOnly}] as const,
    faqs: ['faqs'] as const,
    coupons: (userId?: string) => ['coupons', {userId}] as const,
    orders: (params?: {
        userId?: string
        status?: string
        page?: number
        limit?: number
    }) => ['orders', params] as const
}

// Hero Slides
export function useHeroSlides() {
    return useQuery({
        queryKey: apiKeys.heroSlides,
        queryFn: () => api.listHeroSlides(),
        staleTime: 15 * 60 * 1000 // 15 minutes - hero slides rarely change
    })
}

// Categories
export function useCategories(activeOnly = true) {
    return useQuery({
        queryKey: apiKeys.categories(activeOnly),
        queryFn: () => api.listCategories(activeOnly),
        staleTime: 10 * 60 * 1000 // 10 minutes
    })
}

// FAQs
export function useFAQs() {
    return useQuery({
        queryKey: apiKeys.faqs,
        queryFn: () => api.listFAQs(),
        staleTime: 30 * 60 * 1000 // 30 minutes - FAQs change rarely
    })
}

// Coupons
export function useCoupons(userId?: string) {
    return useQuery({
        queryKey: apiKeys.coupons(userId),
        queryFn: () => api.listCoupons(userId),
        enabled: !!userId, // Only fetch if userId is provided
        staleTime: 5 * 60 * 1000 // 5 minutes
    })
}

// Coupon validation
export function useValidateCoupon() {
    return useMutation({
        mutationFn: ({
            code,
            totalAmount
        }: {
            code: string
            totalAmount: number
        }) => api.validateCoupon(code, totalAmount),
        onError: error => {
            console.error('Coupon validation failed:', error)
        }
    })
}

// Orders
export function useOrders(params?: {
    userId?: string
    status?: string
    page?: number
    limit?: number
}) {
    return useQuery({
        queryKey: apiKeys.orders(params),
        queryFn: () => api.listOrders(params),
        enabled: !!params?.userId, // Only fetch if userId is provided
        staleTime: 2 * 60 * 1000 // 2 minutes - orders change frequently
    })
}

// Create order
export function useCreateOrder() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (orderData: Partial<Order>) => api.createOrder(orderData),
        onSuccess: () => {
            // Invalidate orders cache to refetch
            queryClient.invalidateQueries({
                queryKey: ['orders']
            })
        },
        onError: error => {
            console.error('Failed to create order:', error)
        }
    })
}
