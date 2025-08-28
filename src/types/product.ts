export type Product = {
    id: string
    name: string
    slug: string
    price: number // in smallest currency unit (e.g., cents)
    oldPrice?: number // optional compare-at price in cents
    description: string
    image?: string
    colors?: string[]
    code?: string
    categories?: string[]
}

export type CartItem = {
    productId: string
    quantity: number
}
