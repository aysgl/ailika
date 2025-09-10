export interface Category {
    id: string
    name: string
    slug: string
    image?: string
    description?: string
    parentId?: string | null
    sortOrder?: number
    isActive?: boolean
    createdAt?: string
    updatedAt?: string
}

export interface CategoryWithChildren extends Category {
    children?: Category[]
}
