import {NextResponse} from 'next/server'
import type {Order} from '@/types'

// In-memory storage for demo (production'da database kullanın)
const orders: Order[] = [
    {
        id: 'ORD-2024-001',
        userId: 'demo@user.com',
        items: [
            {
                id: 'item-1',
                productId: '1',
                productName: 'Ailika Premium Kalıcı Oje 15ml',
                productImage:
                    'https://www.ellisan.com/wp-content/uploads/2025/04/AilikaKaliciOje-768x768.webp',
                quantity: 2,
                price: 1299,
                total: 2598
            },
            {
                id: 'item-2',
                productId: 'set-ellisan-13',
                productName: 'Başlangıç Seti 13 Parça',
                productImage:
                    'https://www.ellisan.com/wp-content/uploads/2025/04/AilikaKaliciOje-768x768.webp',
                quantity: 1,
                price: 156900,
                total: 156900
            }
        ],
        subtotal: 159498,
        shipping: 0,
        tax: 0,
        discount: 1595, // %1 indirim
        total: 157903,
        couponCode: 'YENI10',
        shippingAddress: {
            fullName: 'Ayşegül Avcu',
            email: 'aysegul.avcu@hotmail.com',
            phone: '+905393242020',
            address: 'Şişli Mah. Fulya Cad. Demir Plaza No:23/A',
            city: 'İstanbul',
            country: 'Türkiye',
            postalCode: '34762'
        },
        status: 'delivered',
        paymentStatus: 'paid',
        paymentMethod: 'credit_card',
        trackingNumber: 'TRK123456789',
        notes: 'Hızlı teslimat talep edildi',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString() // 5 days ago
    },
    {
        id: 'ORD-2024-002',
        userId: 'demo@user.com',
        items: [
            {
                id: 'item-3',
                productId: '5',
                productName: 'Borthe Premium Kalıcı Oje 12ml No:002',
                productImage:
                    'https://www.ellisan.com/wp-content/uploads/2024/02/002-768x768.webp',
                quantity: 3,
                price: 1199,
                total: 3597
            }
        ],
        subtotal: 3597,
        shipping: 2990,
        tax: 0,
        discount: 0,
        total: 6587,
        shippingAddress: {
            fullName: 'Ayşegül Avcu',
            email: 'aysegul.avcu@hotmail.com',
            phone: '+905393242020',
            address: 'Şişli Mah. Fulya Cad. Demir Plaza No:23/A',
            city: 'İstanbul',
            country: 'Türkiye',
            postalCode: '34762'
        },
        status: 'shipped',
        paymentStatus: 'paid',
        paymentMethod: 'credit_card',
        trackingNumber: 'TRK987654321',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() // 2 days ago
    },
    {
        id: 'ORD-2024-003',
        userId: 'demo@user.com',
        items: [
            {
                id: 'item-4',
                productId: 'sol-01',
                productName: 'Borthe Bitki Özlü Tırnak Bakım Yağı 30ml',
                productImage:
                    'https://www.ellisan.com/wp-content/uploads/2025/07/borthe_nailOil-768x768.webp',
                quantity: 1,
                price: 1299,
                total: 1299
            }
        ],
        subtotal: 1299,
        shipping: 2990,
        tax: 0,
        discount: 0,
        total: 4289,
        shippingAddress: {
            fullName: 'Ayşegül Avcu',
            email: 'aysegul.avcu@hotmail.com',
            phone: '+905393242020',
            address: 'Şişli Mah. Fulya Cad. Demir Plaza No:23/A',
            city: 'İstanbul',
            country: 'Türkiye',
            postalCode: '34762'
        },
        status: 'processing',
        paymentStatus: 'paid',
        paymentMethod: 'credit_card',
        createdAt: new Date().toISOString() // Today
    }
]

export async function GET(request: Request) {
    try {
        const {searchParams} = new URL(request.url)
        const userId = searchParams.get('userId')
        const status = searchParams.get('status')
        const limit = parseInt(searchParams.get('limit') || '10')
        const page = parseInt(searchParams.get('page') || '1')

        let filteredOrders = orders

        // Filter by user ID
        if (userId) {
            filteredOrders = orders.filter(order => order.userId === userId)
        }

        // Filter by status
        if (status) {
            filteredOrders = filteredOrders.filter(
                order => order.status === status
            )
        }

        // Sort by creation date (newest first)
        filteredOrders.sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        )

        // Pagination
        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit
        const paginatedOrders = filteredOrders.slice(startIndex, endIndex)

        return NextResponse.json({
            success: true,
            data: paginatedOrders,
            pagination: {
                page,
                limit,
                total: filteredOrders.length,
                totalPages: Math.ceil(filteredOrders.length / limit)
            }
        })
    } catch (error) {
        console.error('Orders fetch error:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch orders'
            },
            {status: 500}
        )
    }
}

export async function POST(request: Request) {
    try {
        const orderData = await request.json()

        // Generate order ID
        const orderId = `ORD-${new Date().getFullYear()}-${String(
            orders.length + 1
        ).padStart(3, '0')}`

        const newOrder: Order = {
            id: orderId,
            ...orderData,
            status: 'pending',
            paymentStatus: 'pending',
            createdAt: new Date().toISOString()
        }

        // Add to storage
        orders.push(newOrder)

        return NextResponse.json({
            success: true,
            data: newOrder
        })
    } catch (error) {
        console.error('Order creation error:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to create order'
            },
            {status: 500}
        )
    }
}
