export interface Review {
    id: string
    productId: string
    productName: string
    productImage?: string
    rating: number
    comment: string
    date: string // ISO string
    userId?: string
    userName?: string
    verified?: boolean
}

export interface ReviewFormData {
    productId: string
    productName: string
    rating: number
    comment: string
    userId: string
}
