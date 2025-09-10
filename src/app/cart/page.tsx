'use client'

import Link from 'next/link'
import {useCart, formatCents} from '../../context/CartContext'
import {useProducts} from '../../hooks/useProducts'
import {Button} from '../../components/ui/button'
import {Input} from '../../components/ui/input'
import {Separator} from '../../components/ui/separator'
import CartItemRow from '@/components/CartItemRow'
import TitleWave from '@/components/TitleWave'
import Breadcrumbs from '@/components/Breadcrumbs'
import EmptyState from '@/components/EmptyState'
import {ShoppingCart} from 'lucide-react'
import * as React from 'react'
import {Product} from '@/types'
import {Coupon} from '@/types/account'

export default function CartPage() {
    const {items, updateQuantity, removeFromCart, subtotalCents, clearCart} =
        useCart()
    const {data: products, isLoading: loading} = useProducts()
    const [couponCode, setCouponCode] = React.useState('')
    const [availableCoupons, setAvailableCoupons] = React.useState<Coupon[]>([])
    const [appliedCoupon, setAppliedCoupon] = React.useState<Coupon | null>(
        null
    )

    React.useEffect(() => {
        try {
            const raw = localStorage.getItem('userCoupons')
            const saved = raw ? (JSON.parse(raw) as Coupon[]) : []
            setAvailableCoupons(saved)
        } catch {}
    }, [])

    if (items.length === 0) {
        return (
            <div className="container mx-auto pb-16">
                <EmptyState
                    className="bg-white/40 rounded-xl py-16"
                    icon={<ShoppingCart className="w-10 h-10 text-primary" />}
                    title="Sepetiniz boş"
                    description="Sepetiniz boş. Alışverişe devam etmek için mağazaya gidin."
                    action={
                        <Button asChild>
                            <Link href="/">Anasayfa</Link>
                        </Button>
                    }
                />
            </div>
        )
    }

    return (
        <div className="container mx-auto lg:px-0 px-2 pb-12">
            <div className="mb-8 space-y-2">
                <div className="flex flex-col items-center justify-center mx-auto gap-2 bg-white/40 p-12 rounded-lg">
                    <TitleWave title={'Sepetim'} bandClass="text-secondary" />
                    <Breadcrumbs
                        items={[
                            {label: 'Anasayfa', href: '/'},
                            {label: 'Sepetim'}
                        ]}
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_30%] lg:gap-8 gap-4">
                <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 space-y-4 divide-y divide-primary/10">
                    {loading && (
                        <div className="text-sm text-foreground">
                            Ürünler yükleniyor...
                        </div>
                    )}
                    {items.map(it => {
                        const product = products?.find(
                            (p: Product) => p.id === it.productId
                        )
                        if (!product) return null
                        return (
                            <CartItemRow
                                key={it.productId}
                                slug={product.slug}
                                name={product.name}
                                code={product.code}
                                image={product.image}
                                priceCents={product.price}
                                quantity={it.quantity}
                                onRemove={() => removeFromCart(it.productId)}
                                onDecrease={() =>
                                    updateQuantity(
                                        it.productId,
                                        it.quantity - 1
                                    )
                                }
                                onIncrease={() =>
                                    updateQuantity(
                                        it.productId,
                                        it.quantity + 1
                                    )
                                }
                                formatCents={formatCents}
                            />
                        )
                    })}
                </div>
                <aside className="rounded-xl p-4 h-max bg-white space-y-4">
                    {/* Ücretsiz kargo eşiği */}
                    <FreeShippingProgress
                        subtotalCents={subtotalCents}
                        discountCents={getDiscountCents(
                            subtotalCents,
                            appliedCoupon
                        )}
                        thresholdCents={25000}
                    />
                    {/* Kupon */}
                    <div className="space-y-2">
                        <div className="text-sm font-medium">Kupon Kodu</div>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Kupon kodu"
                                value={couponCode}
                                onChange={e => setCouponCode(e.target.value)}
                            />
                            <Button
                                variant="outline"
                                onClick={() =>
                                    applyCoupon(
                                        couponCode,
                                        availableCoupons,
                                        setAppliedCoupon,
                                        setCouponCode
                                    )
                                }>
                                Uygula
                            </Button>
                        </div>
                        {appliedCoupon && (
                            <div className="text-xs text-foreground/70">
                                Uygulanan kupon:{' '}
                                <strong>{appliedCoupon.code}</strong>{' '}
                                <button
                                    className="underline ml-2"
                                    onClick={() => {
                                        setAppliedCoupon(null)
                                        try {
                                            localStorage.removeItem(
                                                'appliedCoupon'
                                            )
                                        } catch {}
                                    }}>
                                    Kaldır
                                </button>
                            </div>
                        )}
                    </div>

                    <Separator />

                    {/* Toplam Özet */}
                    <Totals
                        subtotalCents={subtotalCents}
                        appliedCoupon={appliedCoupon}
                        freeShippingThresholdCents={25000}
                        shippingCentsDefault={2999}
                    />

                    <div className="flex flex-col gap-2">
                        <Link href="/checkout" className="block">
                            <Button
                                variant="secondary"
                                className="w-full"
                                size={'lg'}>
                                Hemen Öde
                            </Button>
                        </Link>
                        <div className="flex items-center justify-between text-xs text-foreground/60">
                            <span>İade ve değişim politikası</span>
                            <Link href="/help" className="underline">
                                Detaylar
                            </Link>
                        </div>
                        <button
                            className="mt-1 w-full text-sm underline text-foreground/70"
                            onClick={clearCart}>
                            Tümünü Temizle
                        </button>
                        <Link
                            href="/shop"
                            className="w-full text-sm underline text-foreground/70 text-center">
                            Alışverişe Devam Et
                        </Link>
                    </div>
                </aside>
            </div>
        </div>
    )
}

// Helpers
function getDiscountCents(
    subtotalCents: number,
    coupon: Coupon | null
): number {
    if (!coupon) return 0
    if (coupon.status === 'expired' || coupon.status === 'used') return 0
    const now = Date.now()
    if (coupon.expiresAt && new Date(coupon.expiresAt).getTime() < now) return 0
    if (coupon.discountType === 'percent') {
        return Math.min(
            subtotalCents,
            Math.floor((subtotalCents * coupon.discountValue) / 100)
        )
    }
    // amount assumed in kuruş
    return Math.min(subtotalCents, coupon.discountValue)
}

function applyCoupon(
    code: string,
    available: Coupon[],
    setApplied: (c: Coupon | null) => void,
    setCode: (v: string) => void
) {
    const normalized = code.trim().toUpperCase()
    if (!normalized) return
    // Try from available coupons, else accept a couple of demo codes
    const fromAvailable = available.find(
        c => c.code.toUpperCase() === normalized
    )
    const demo: Coupon[] = [
        {
            id: 'demo-10',
            code: 'YENI10',
            discountType: 'percent',
            discountValue: 10
        },
        {
            id: 'demo-15',
            code: 'ELVET15',
            discountType: 'percent',
            discountValue: 15
        }
    ]
    const found = fromAvailable || demo.find(c => c.code === normalized) || null
    setApplied(found)
    try {
        if (found) localStorage.setItem('appliedCoupon', JSON.stringify(found))
    } catch {}
    setCode('')
}

function Totals({
    subtotalCents,
    appliedCoupon,
    freeShippingThresholdCents,
    shippingCentsDefault
}: {
    subtotalCents: number
    appliedCoupon: Coupon | null
    freeShippingThresholdCents: number
    shippingCentsDefault: number
}) {
    const discountCents = getDiscountCents(subtotalCents, appliedCoupon)
    const effectiveSubtotal = Math.max(0, subtotalCents - discountCents)
    const shippingCents =
        effectiveSubtotal >= freeShippingThresholdCents
            ? 0
            : shippingCentsDefault
    const totalCents = effectiveSubtotal + shippingCents
    return (
        <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
                <span>Ara toplam</span>
                <strong>{formatCents(subtotalCents)}</strong>
            </div>
            {discountCents > 0 && (
                <div className="flex items-center justify-between text-green-700">
                    <span>
                        İndirim{' '}
                        {appliedCoupon?.code ? `(${appliedCoupon.code})` : ''}
                    </span>
                    <strong>-{formatCents(discountCents)}</strong>
                </div>
            )}
            <div className="flex items-center justify-between">
                <span>Kargo</span>
                <strong>
                    {shippingCents === 0
                        ? 'Ücretsiz'
                        : formatCents(shippingCents)}
                </strong>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-base">
                <span>Genel Toplam</span>
                <strong>{formatCents(totalCents)}</strong>
            </div>
            <div className="text-[11px] text-foreground/60">
                Fiyatlara KDV dahildir.
            </div>
        </div>
    )
}

function FreeShippingProgress({
    subtotalCents,
    discountCents,
    thresholdCents
}: {
    subtotalCents: number
    discountCents: number
    thresholdCents: number
}) {
    const remaining = Math.max(
        0,
        thresholdCents - (subtotalCents - discountCents)
    )
    const progress = Math.min(
        100,
        Math.round(((subtotalCents - discountCents) / thresholdCents) * 100)
    )
    return (
        <div className="p-3 rounded-lg border border-primary/10 bg-white/60">
            <div className="text-xs mb-2">
                {remaining > 0 ? (
                    <>
                        Ücretsiz kargo için {formatCents(remaining)} daha
                        ekleyin.
                    </>
                ) : (
                    <>Tebrikler! Ücretsiz kargo kazandınız.</>
                )}
            </div>
            <div className="h-2 w-full rounded bg-muted overflow-hidden">
                <div
                    className="h-full bg-primary"
                    style={{width: `${progress}%`}}
                />
            </div>
        </div>
    )
}
