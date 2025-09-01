'use client'
import {useAuth} from '@/context/AuthContext'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import EmptyState from '@/components/EmptyState'
import {Button} from '@/components/ui/button'
import Link from 'next/link'
import {Check, CheckCircle, Package, ShoppingBag, Truck} from 'lucide-react'
import AccountLayout from '@/components/AccountLayout'
import {useCart} from '@/context/CartContext'
import {Badge} from '@/components/ui/badge'
import {useEffect, useState} from 'react'
import Image from 'next/image'
import {Separator} from '@/components/ui/separator'

type OrderItemUI = {
    name: string
    quantity: number
    price: string
    image?: string
}
type OrderUI = {
    id: string
    date: string
    status: 'processing' | 'shipped' | 'delivered' | string
    total: string
    items: OrderItemUI[]
    shippingAddress: string
    trackingNumber: string | null
}

export default function OrdersPage() {
    const [openOrderId, setOpenOrderId] = useState<string | null>(null)
    const {isAuthenticated} = useAuth()
    const {clearCart} = useCart()
    const [ordersState, setOrdersState] = useState<OrderUI[]>([])

    useEffect(() => {
        // Merge mock with saved orders
        const mock: OrderUI[] = [
            {
                id: 'SP-2024-001',
                date: '15 Ocak 2024',
                status: 'delivered',
                total: '₺299.99',
                items: [
                    {
                        name: 'Kablosuz Kulaklık',
                        quantity: 1,
                        price: '₺199.99',
                        image: '/images/hero-slider/nail-polish.png'
                    },
                    {
                        name: 'Telefon Kılıfı',
                        quantity: 2,
                        price: '₺50.00',
                        image: '/images/hero-slider/nail-polish-2.png'
                    }
                ],
                shippingAddress:
                    'Atatürk Mah. Cumhuriyet Cad. No:123 Kadıköy/İstanbul',
                trackingNumber: 'TK123456789'
            },
            {
                id: 'SP-2024-002',
                date: '20 Ocak 2024',
                status: 'shipped',
                total: '₺149.99',
                items: [
                    {
                        name: 'Bluetooth Hoparlör',
                        quantity: 1,
                        price: '₺149.99',
                        image: '/images/instagram/1.png'
                    }
                ],
                shippingAddress:
                    'Atatürk Mah. Cumhuriyet Cad. No:123 Kadıköy/İstanbul',
                trackingNumber: 'TK987654321'
            },
            {
                id: 'SP-2024-003',
                date: '25 Ocak 2024',
                status: 'processing',
                total: '₺89.99',
                items: [
                    {
                        name: 'USB Kablo',
                        quantity: 3,
                        price: '₺29.99',
                        image: '/images/instagram/2.png'
                    }
                ],
                shippingAddress:
                    'Atatürk Mah. Cumhuriyet Cad. No:123 Kadıköy/İstanbul',
                trackingNumber: null
            }
        ]

        let saved: OrderUI[] = []
        try {
            const paid = localStorage.getItem('paidOrders')
            const pending = localStorage.getItem('pendingOrder')
            if (paid) saved = JSON.parse(paid)
            if (pending) {
                // If we land with status=paid, move pending into paid
                const url = new URL(window.location.href)
                if (url.searchParams.get('status') === 'paid') {
                    const p = JSON.parse(pending) as OrderUI
                    p.status = 'shipped'
                    const updated = [p, ...saved]
                    localStorage.setItem('paidOrders', JSON.stringify(updated))
                    localStorage.removeItem('pendingOrder')
                    saved = updated
                    // Clear cart after successful payment
                    clearCart()
                }
            }
        } catch {}
        setOrdersState([...saved, ...mock])
    }, [clearCart])

    const orders = ordersState

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'delivered':
                return (
                    <Badge variant="secondary" className="bg-lime-500 p-2 px-4">
                        Teslim Edildi
                        <Check className="w-3 h-3 ms-1" />
                    </Badge>
                )
            case 'shipped':
                return (
                    <Badge variant="outline" className="p-2 px-4">
                        Kargoda
                    </Badge>
                )
            case 'processing':
                return (
                    <Badge variant="outline" className="p-2 px-4">
                        Hazırlanıyor
                    </Badge>
                )
            default:
                return (
                    <Badge variant="outline" className="p-2 px-4">
                        {status}
                    </Badge>
                )
        }
    }

    const getTrackingProgress = (status: string) => {
        const steps = [
            {key: 'processing', label: 'Sipariş Alındı', icon: Package},
            {key: 'shipped', label: 'Kargoya Verildi', icon: Truck},
            {key: 'delivered', label: 'Teslim Edildi', icon: CheckCircle}
        ]

        const currentIndex = steps.findIndex(step => step.key === status)

        return steps.map((step, index) => {
            const Icon = step.icon
            const isActive = index <= currentIndex
            const isCompleted = index < currentIndex

            return (
                <div key={step.key} className="flex items-center">
                    <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                            isActive
                                ? 'border-primary bg-primary text-white'
                                : 'border-primary/20 text-primary'
                        }`}>
                        <Icon className="w-4 h-4" />
                    </div>
                    {index < steps.length - 1 && (
                        <div
                            className={`w-12 h-0.5 ${
                                isCompleted
                                    ? 'bg-primary'
                                    : 'border border-dashed border-primary/20'
                            }`}
                        />
                    )}
                </div>
            )
        })
    }

    const getItemImage = (order: OrderUI, index: number) => {
        const byIndex = order.items[index]
        if (byIndex?.image) return byIndex.image
        const anyWithImage = order.items.find(it => !!it.image)
        if (anyWithImage?.image) return anyWithImage.image
        return '/images/instagram/1.png'
    }

    return (
        <AccountLayout
            title="Siparişlerim"
            breadcrumb={[
                {label: 'Anasayfa', href: '/'},
                {label: 'Hesabım', href: '/account'},
                {label: 'Siparişlerim'}
            ]}>
            {!isAuthenticated ? (
                <div className="container mx-auto py-16 text-center">
                    Lütfen önce giriş yapın.
                </div>
            ) : orders.length === 0 ? (
                <EmptyState
                    icon={<ShoppingBag className="w-10 h-10 text-primary" />}
                    title="Henüz siparişiniz yok"
                    description="Alışverişe başlayarak beğendiğiniz ürünleri sepete ekleyin ve sipariş verin."
                    action={
                        <Link href="/shop">
                            <Button>Alışverişe Başla</Button>
                        </Link>
                    }
                />
            ) : (
                <div>
                    <div className="space-y-4">
                        {orders.map(order => (
                            <Card key={order.id}>
                                <CardHeader className="pb-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex -space-x-3">
                                                {order.items
                                                    .slice(0, 3)
                                                    .map((item, i) => (
                                                        <div
                                                            key={i}
                                                            className="w-10 h-10 rounded-full border-3 border-white overflow-hidden bg-white">
                                                            <Image
                                                                alt={item.name}
                                                                src={getItemImage(
                                                                    order,
                                                                    i
                                                                )}
                                                                width={40}
                                                                height={40}
                                                                className="object-cover rounded-full w-full h-full"
                                                            />
                                                        </div>
                                                    ))}
                                            </div>
                                            <div>
                                                <CardTitle className="text-lg text-card-foreground">
                                                    Sipariş #{order.id}
                                                </CardTitle>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {order.date}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-semibold">
                                                {order.total}
                                            </p>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="pt-0">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-0">
                                            {getTrackingProgress(order.status)}
                                            <div className="ml-2">
                                                {getStatusBadge(order.status)}
                                            </div>
                                        </div>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                setOpenOrderId(
                                                    openOrderId === order.id
                                                        ? null
                                                        : order.id
                                                )
                                            }>
                                            Detayları Gör
                                        </Button>
                                    </div>
                                    {openOrderId === order.id && (
                                        <div className="mt-6 border border-primary/20 rounded-lg p-4">
                                            <div>
                                                <h3 className="font-semibold mb-3">
                                                    Sipariş Durumu
                                                </h3>
                                                <div className="flex items-center space-x-2 mb-4">
                                                    Hazırlanıyor
                                                </div>
                                                {order.trackingNumber && (
                                                    <p className="text-sm text-muted-foreground">
                                                        Takip Numarası:{' '}
                                                        <span className="font-mono">
                                                            {
                                                                order.trackingNumber
                                                            }
                                                        </span>
                                                    </p>
                                                )}
                                            </div>

                                            <Separator className="my-4" />

                                            <div>
                                                <h3 className="font-semibold mb-3">
                                                    Ürünler
                                                </h3>
                                                <div className="space-y-2">
                                                    {order.items.map(
                                                        (
                                                            item: OrderItemUI,
                                                            index: number
                                                        ) => (
                                                            <div
                                                                key={index}
                                                                className="flex justify-between items-center py-2">
                                                                <div>
                                                                    <p>
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </p>
                                                                    <p className="text-sm text-muted-foreground">
                                                                        Adet:{' '}
                                                                        {
                                                                            item.quantity
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <p className="font-semibold">
                                                                    {item.price}
                                                                </p>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                                <Separator className="my-3" />
                                                <div className="flex justify-between items-center">
                                                    <p className="font-semibold">
                                                        Toplam
                                                    </p>
                                                    <p className="font-bold text-lg">
                                                        {order.total}
                                                    </p>
                                                </div>
                                            </div>

                                            <Separator className="my-4" />

                                            <div>
                                                <h3 className="font-semibold mb-2">
                                                    Teslimat Adresi
                                                </h3>
                                                <p className="text-muted-foreground">
                                                    {order.shippingAddress}
                                                </p>
                                            </div>

                                            {order.status === 'shipped' && (
                                                <Button className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90">
                                                    <Truck className="w-4 h-4 mr-2" />
                                                    Kargo Takip Et
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </AccountLayout>
    )
}
