export interface OrderItem {
    id: string
    productId: string
    productName: string
    productImage?: string
    quantity: number
    price: number // in cents
    total: number // in cents
}

export interface ShippingAddress {
    fullName: string
    email: string
    phone: string
    address: string
    city: string
    country: string
    postalCode: string
}

export interface Order {
    id: string
    userId?: string
    items: OrderItem[]
    subtotal: number // in cents
    shipping: number // in cents
    tax: number // in cents
    discount: number // in cents
    total: number // in cents
    couponCode?: string
    shippingAddress: ShippingAddress
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
    paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
    paymentMethod?: string
    trackingNumber?: string
    notes?: string
    createdAt: string // ISO string
    updatedAt?: string
}
