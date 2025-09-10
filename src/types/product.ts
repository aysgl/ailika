export type MediaItem = {
    type: 'image' | 'video'
    url: string
    thumbnail?: string // Video için thumbnail
}

export type Product = {
    id: string
    name: string
    slug: string
    price: number // in smallest currency unit (e.g., cents)
    oldPrice?: number // optional compare-at price in cents
    description: string
    image?: string
    gallery?: string[] // multiple product images for gallery
    media?: MediaItem[] // mixed media gallery (images + videos)
    colors?: string[]
    code?: string
    categories?: string[]
    campaign?: string
}

export type CartItem = {
    productId: string
    quantity: number
}
