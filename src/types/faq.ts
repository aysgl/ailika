export interface FAQ {
    id: string
    question: string
    answer: string
    category?: string
    sortOrder?: number
    isActive?: boolean
    createdAt?: string
    updatedAt?: string
}

export interface FAQCategory {
    id: string
    name: string
    slug: string
    sortOrder?: number
    faqs?: FAQ[]
}
