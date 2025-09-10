{
    /**
     * Account Card Page Types
     */
}
export type SavedCard = {
    id: string
    holderName: string
    last4: string
    brand?: string
    expMonth: string
    expYear: string
}

{
    /**
     * Account Orders Page Types
     */
}
export type OrderItemUI = {
    name: string
    quantity: number
    price: string
    image?: string
}
export type OrderUI = {
    id: string
    date: string
    status: 'processing' | 'shipped' | 'delivered' | string
    total: string
    items: OrderItemUI[]
    shippingAddress: string
    trackingNumber: string | null
}

{
    /**
     * Account Coupons Page Types
     */
}
export interface Coupon {
    id: string
    code: string
    title?: string
    description?: string
    discountType: 'percent' | 'amount'
    discountValue: number
    minSpend?: number
    maxDiscount?: number
    expiresAt?: string // ISO string
    usageLimit?: number
    usedCount?: number
    isActive?: boolean
    status?: 'active' | 'used' | 'expired'
    createdAt?: string
    updatedAt?: string
}

export interface UserCoupon extends Coupon {
    userId: string
    usedAt?: string
}

export interface CouponCardProps {
    title?: string
    code: string
    description?: string
    discountType: 'percent' | 'amount'
    discountValue: number
    expiresAt?: string
    minSpend?: number
    status?: 'active' | 'used' | 'expired'
    className?: string
}

{
    /**
     * Account My Address Page Types
     */
}
export type Address = {
    id: string
    title: string
    fullName: string
    email: string
    phone: string
    address: string
    city: string
    postalCode: string
    country: string
}

{
    /**
     * Account Reviews Page Types
     */
}
export type ReviewUI = {
    id: string
    productName: string
    productImage?: string
    rating: number
    comment: string
    date: Date
}
