'use client'

import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import {api} from '../lib/api'
import type {Review} from '../types/review'

// Query keys for consistent caching
export const reviewKeys = {
    all: ['reviews'] as const,
    lists: () => [...reviewKeys.all, 'list'] as const,
    list: (filters: Record<string, unknown>) =>
        [...reviewKeys.lists(), {filters}] as const
}

// Hook to fetch all reviews
export function useReviews() {
    return useQuery({
        queryKey: reviewKeys.lists(),
        queryFn: () => api.listReviews(),
        staleTime: 2 * 60 * 1000 // 2 minutes - reviews change more frequently
    })
}

// Hook to create a new review
export function useCreateReview() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (reviewData: {
            productId: string
            productName: string
            rating: number
            comment: string
            userId: string
        }) => api.createReview(reviewData),
        onSuccess: newReview => {
            // Add the new review to the cache optimistically
            queryClient.setQueryData<Review[]>(
                reviewKeys.lists(),
                oldReviews => {
                    return oldReviews ? [newReview, ...oldReviews] : [newReview]
                }
            )

            // Invalidate to refetch from server
            queryClient.invalidateQueries({queryKey: reviewKeys.lists()})
        },
        onError: error => {
            console.error('Failed to create review:', error)
        }
    })
}
