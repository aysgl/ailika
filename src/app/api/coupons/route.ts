import {NextResponse} from 'next/server'
import type {Coupon} from '@/types/account'

// Helper functions
function futureDaysIso(days: number): string {
    const date = new Date()
    date.setDate(date.getDate() + days)
    return date.toISOString()
}

function pastDaysIso(days: number): string {
    const date = new Date()
    date.setDate(date.getDate() - days)
    return date.toISOString()
}

function resolveStatus(coupon: Coupon): 'active' | 'used' | 'expired' {
    if (!coupon.expiresAt) return 'active'

    const now = new Date()
    const expires = new Date(coupon.expiresAt)

    if (expires < now) return 'expired'
    return 'active'
}

// In-memory storage for demo (production'da database kullanın)
const coupons: Coupon[] = [
    {
        id: 'C-NEW-10',
        code: 'YENI10',
        title: 'Yeni Üyelere %10',
        description: 'Satın alınan ürünlerden %10 indirim',
        discountType: 'percent',
        discountValue: 10,
        expiresAt: futureDaysIso(30),
        isActive: true
    },
    {
        id: 'C-FREE-SHIP',
        code: 'KARGO0',
        title: 'Kargo Bedava',
        description: '₺250 ve üzeri alışverişlerde geçerli',
        discountType: 'amount',
        discountValue: 0,
        minSpend: 25000,
        expiresAt: futureDaysIso(7),
        isActive: true
    },
    {
        id: 'C-OLD-15',
        code: 'ELVET15',
        title: 'Seçili Ürünlerde %15',
        description: 'Satın alınan ürünlerden %15 indirim',
        discountType: 'percent',
        discountValue: 15,
        expiresAt: pastDaysIso(1),
        isActive: true
    },
    {
        id: 'C-SUMMER-20',
        code: 'YAZ20',
        title: 'Yaz Kampanyası %20',
        description: '500₺ üzeri alışverişlerde %20 indirim',
        discountType: 'percent',
        discountValue: 20,
        minSpend: 50000,
        maxDiscount: 10000,
        expiresAt: futureDaysIso(15),
        isActive: true
    }
]

export async function GET(request: Request) {
    try {
        const {searchParams} = new URL(request.url)
        const userId = searchParams.get('userId')
        const active = searchParams.get('active')

        let filteredCoupons = coupons

        // Filter by active status if requested
        if (active === 'true') {
            filteredCoupons = coupons.filter(coupon => coupon.isActive)
        }

        // Add status to each coupon
        const couponsWithStatus = filteredCoupons.map(coupon => ({
            ...coupon,
            status: resolveStatus(coupon)
        }))

        return NextResponse.json({
            success: true,
            data: couponsWithStatus
        })
    } catch (error) {
        console.error('Coupons fetch error:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch coupons'
            },
            {status: 500}
        )
    }
}

// Validate coupon code
export async function POST(request: Request) {
    try {
        const {code, totalAmount} = await request.json()

        if (!code) {
            return NextResponse.json(
                {success: false, error: 'Coupon code is required'},
                {status: 400}
            )
        }

        const coupon = coupons.find(
            c => c.code.toLowerCase() === code.toLowerCase()
        )

        if (!coupon) {
            return NextResponse.json(
                {success: false, error: 'Invalid coupon code'},
                {status: 404}
            )
        }

        if (!coupon.isActive) {
            return NextResponse.json(
                {success: false, error: 'Coupon is not active'},
                {status: 400}
            )
        }

        const status = resolveStatus(coupon)
        if (status === 'expired') {
            return NextResponse.json(
                {success: false, error: 'Coupon has expired'},
                {status: 400}
            )
        }

        // Check minimum spend
        if (coupon.minSpend && totalAmount < coupon.minSpend) {
            return NextResponse.json(
                {
                    success: false,
                    error: `Minimum spend of ₺${(coupon.minSpend / 100).toFixed(
                        2
                    )} required`
                },
                {status: 400}
            )
        }

        // Calculate discount
        let discountAmount = 0
        if (coupon.discountType === 'percent') {
            discountAmount = Math.floor(
                totalAmount * (coupon.discountValue / 100)
            )
            if (coupon.maxDiscount) {
                discountAmount = Math.min(discountAmount, coupon.maxDiscount)
            }
        } else {
            discountAmount = coupon.discountValue
        }

        return NextResponse.json({
            success: true,
            data: {
                coupon,
                discountAmount,
                finalAmount: totalAmount - discountAmount
            }
        })
    } catch (error) {
        console.error('Coupon validation error:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to validate coupon'
            },
            {status: 500}
        )
    }
}
