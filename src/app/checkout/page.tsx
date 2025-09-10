'use client'

import {useEffect, useRef, useState} from 'react'
import TitleWave from '@/components/TitleWave'
import Breadcrumbs from '@/components/Breadcrumbs'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {Button} from '@/components/ui/button'
import {useCart, formatCents} from '@/context/CartContext'
import {useProducts} from '@/hooks/useProducts'
import Image from 'next/image'
import {Product} from '@/types'
import {Coupon} from '@/types/account'

export default function CheckoutPage() {
    // const router = useRouter()
    const {items, subtotalCents} = useCart()
    const {data: products} = useProducts()
    const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null)

    type Address = {
        id: string
        title: string
        email: string
        fullName: string
        phone: string
        address: string
        city: string
        postalCode: string
        country: string
    }

    const [addresses, setAddresses] = useState<Address[]>([])
    const [selectedAddressId, setSelectedAddressId] = useState<string>('new')
    const [checkoutHtml, setCheckoutHtml] = useState<string>('')
    const checkoutRef = useRef<HTMLDivElement | null>(null)

    const [shipping, setShipping] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        country: 'Türkiye'
    })
    // Ödeme yöntemi: yalnızca iyzico
    const shippingFeeCents = 0
    useEffect(() => {
        try {
            const raw = localStorage.getItem('appliedCoupon')
            if (raw) setAppliedCoupon(JSON.parse(raw) as Coupon)
        } catch {}
    }, [])

    const discountCents = getDiscountCents(subtotalCents, appliedCoupon)
    const effectiveSubtotal = Math.max(0, subtotalCents - discountCents)

    useEffect(() => {
        try {
            const raw = localStorage.getItem('ailika_addresses_v1')
            if (raw) {
                const list = JSON.parse(raw) as Address[]
                setAddresses(list)
                if (list.length > 0) {
                    setSelectedAddressId(list[0].id)
                }
            }
        } catch {}
    }, [])

    useEffect(() => {
        if (selectedAddressId === 'new') {
            setShipping(s => ({
                ...s,
                fullName: '',
                email: '',
                phone: '',
                address: '',
                city: '',
                postalCode: '',
                country: 'Türkiye'
            }))
            return
        }
        const a = addresses.find(x => x.id === selectedAddressId)
        if (a) {
            setShipping(s => ({
                ...s,
                fullName: a.fullName,
                email: a.email,
                phone: a.phone,
                address: a.address,
                city: a.city,
                postalCode: a.postalCode,
                country: a.country
            }))
        }
    }, [selectedAddressId, addresses])

    const onPlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!shipping.fullName || !shipping.email || !shipping.address) return

        try {
            const res = await fetch('/api/iyzico/init', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    items: items.map(it => {
                        const p = products?.find(
                            (pp: Product) => pp.id === it.productId
                        )
                        if (!p) {
                            throw new Error(`Ürün bulunamadı: ${it.productId}`)
                        }
                        return {
                            name: p.name,
                            amount: p.price, // kuruş gönderiyoruz
                            quantity: it.quantity
                        }
                    }),
                    shipping
                })
            })
            const data = await res.json()

            if (!res.ok) {
                alert(
                    `Ödeme başlatılamadı: ${data?.error || 'Bilinmeyen hata'}`
                )
                return
            }

            // ✅ Direkt redirect yapmak istiyorsan
            if (data?.paymentPageUrl) {
                window.location.href = data.paymentPageUrl
                return
            }

            // ✅ Sayfaya gömmek istiyorsan
            if (data?.content) {
                setCheckoutHtml(data.content)
                // Pending order'ı yerelde sakla; callback sonrası Orders sayfası bunu "paid"e taşır
                try {
                    const orderId = `ORD-${Date.now()}`
                    const orderDate = new Date().toLocaleDateString('tr-TR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                    })
                    const orderItems = items
                        .map(it => {
                            const p = products?.find(
                                (pp: Product) => pp.id === it.productId
                            )
                            if (!p) return null
                            return {
                                name: p.name,
                                quantity: it.quantity,
                                price: formatCents(p.price)
                            }
                        })
                        .filter(Boolean)
                    const pending = {
                        id: orderId,
                        date: orderDate,
                        status: 'processing',
                        total: formatCents(
                            effectiveSubtotal + shippingFeeCents
                        ),
                        items: orderItems,
                        shippingAddress: `${shipping.address}, ${
                            shipping.city
                        } ${shipping.postalCode || ''} ${
                            shipping.country || ''
                        }`.trim(),
                        trackingNumber: null
                    }
                    localStorage.setItem(
                        'pendingOrder',
                        JSON.stringify(pending)
                    )
                } catch {}
            }
        } catch (err) {
            console.error('Iyzico init hata:', err)
        }
    }

    // Iyzico içerik scriptlerini çalıştır
    useEffect(() => {
        if (!checkoutHtml) return
        const el = checkoutRef.current
        if (!el) return
        el.innerHTML = checkoutHtml
        const scripts = Array.from(el.querySelectorAll('script'))
        scripts.forEach(oldScript => {
            const newScript = document.createElement('script')
            Array.from(oldScript.attributes).forEach(attr => {
                newScript.setAttribute(attr.name, attr.value)
            })
            newScript.text = oldScript.textContent || ''
            oldScript.replaceWith(newScript)
        })
        el.scrollIntoView({behavior: 'smooth', block: 'start'})
    }, [checkoutHtml])

    return (
        <div className="container mx-auto pb-16">
            {/* Checkout form alanı */}
            <div id="iyzico-container" ref={checkoutRef} />

            <div className="mb-8 space-y-2">
                <div className="flex flex-col items-center justify-center mx-auto gap-2 bg-primary/40 p-12 rounded-lg">
                    <TitleWave title={'Ödeme'} bandClass="text-secondary" />
                    <Breadcrumbs
                        items={[
                            {label: 'Anasayfa', href: '/'},
                            {label: 'Sepet', href: '/cart'},
                            {label: 'Ödeme'}
                        ]}
                    />
                </div>
            </div>

            <form
                onSubmit={onPlaceOrder}
                className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-8">
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Teslimat Bilgileri</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            {addresses.length > 0 && (
                                <div className="grid gap-2">
                                    <div className="text-sm font-medium">
                                        Kayıtlı adreslerim
                                    </div>
                                    <div className="grid gap-2">
                                        {addresses.map(a => (
                                            <label
                                                key={a.id}
                                                className="flex items-start gap-3 p-3 rounded-lg border border-foreground/10 bg-white">
                                                <input
                                                    type="radio"
                                                    name="address"
                                                    className="mt-1"
                                                    checked={
                                                        selectedAddressId ===
                                                        a.id
                                                    }
                                                    onChange={() =>
                                                        setSelectedAddressId(
                                                            a.id
                                                        )
                                                    }
                                                />
                                                <div className="text-sm">
                                                    <div className="font-medium">
                                                        {a.title}
                                                    </div>
                                                    <div className="text-foreground/70">
                                                        {a.fullName} • {a.phone}
                                                    </div>
                                                    <div className="text-foreground/70">
                                                        {a.address}, {a.city}{' '}
                                                        {a.postalCode}{' '}
                                                        {a.country}
                                                    </div>
                                                </div>
                                            </label>
                                        ))}
                                        <label className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-foreground/20">
                                            <input
                                                type="radio"
                                                name="address"
                                                checked={
                                                    selectedAddressId === 'new'
                                                }
                                                onChange={() =>
                                                    setSelectedAddressId('new')
                                                }
                                            />
                                            Yeni adres kullan
                                        </label>
                                    </div>
                                </div>
                            )}
                            <div className="grid md:grid-cols-2 gap-4">
                                <Input
                                    placeholder="Ad Soyad"
                                    value={shipping.fullName}
                                    onChange={e =>
                                        setShipping(s => ({
                                            ...s,
                                            fullName: e.target.value
                                        }))
                                    }
                                    required
                                />
                                <Input
                                    type="email"
                                    placeholder="E-posta"
                                    value={shipping.email}
                                    onChange={e =>
                                        setShipping(s => ({
                                            ...s,
                                            email: e.target.value
                                        }))
                                    }
                                    required
                                />
                            </div>
                            <Input
                                placeholder="Telefon"
                                value={shipping.phone}
                                onChange={e =>
                                    setShipping(s => ({
                                        ...s,
                                        phone: e.target.value
                                    }))
                                }
                                required
                            />
                            <Textarea
                                placeholder="Adres"
                                value={shipping.address}
                                onChange={e =>
                                    setShipping(s => ({
                                        ...s,
                                        address: e.target.value
                                    }))
                                }
                                required
                            />
                            <div className="grid md:grid-cols-3 gap-4">
                                <Input
                                    placeholder="Şehir"
                                    value={shipping.city}
                                    onChange={e =>
                                        setShipping(s => ({
                                            ...s,
                                            city: e.target.value
                                        }))
                                    }
                                    required
                                />
                                <Input
                                    placeholder="Posta Kodu"
                                    value={shipping.postalCode}
                                    onChange={e =>
                                        setShipping(s => ({
                                            ...s,
                                            postalCode: e.target.value
                                        }))
                                    }
                                    required
                                />
                                <Input
                                    placeholder="Ülke"
                                    value={shipping.country}
                                    onChange={e =>
                                        setShipping(s => ({
                                            ...s,
                                            country: e.target.value
                                        }))
                                    }
                                    required
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Summary */}
                <aside className="rounded-xl p-4 h-max bg-white/90 space-y-4">
                    <div className="text-sm font-semibold">Sipariş Özeti</div>
                    <div className="grid gap-2 text-sm">
                        {items.map(it => {
                            const p = products?.find(
                                (pp: Product) => pp.id === it.productId
                            )
                            if (!p) return null
                            return (
                                <div
                                    key={it.productId}
                                    className="flex items-center justify-between gap-3">
                                    <Image
                                        src={p.image || '/next.svg'}
                                        alt={p.name}
                                        width={48}
                                        height={48}
                                        className="w-12 h-12 rounded-full object-cover border"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="text-foreground/70 line-clamp-1">
                                            {p.name} × {it.quantity}
                                        </div>
                                    </div>
                                    <span className="font-medium whitespace-nowrap">
                                        {formatCents(p.price * it.quantity)}
                                    </span>
                                </div>
                            )
                        })}
                        {discountCents > 0 && (
                            <div className="flex items-center justify-between text-green-700">
                                <span>
                                    Kupon indirimi{' '}
                                    {appliedCoupon?.code
                                        ? `(${appliedCoupon.code})`
                                        : ''}
                                </span>
                                <span>-{formatCents(discountCents)}</span>
                            </div>
                        )}
                        <div className="flex items-center justify-between pt-2 border-t border-foreground/10">
                            <span>Kargo</span>
                            <span className="font-medium">
                                {shippingFeeCents === 0
                                    ? 'Ücretsiz'
                                    : formatCents(shippingFeeCents)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-base font-semibold">
                            <span>Toplam</span>
                            <span>
                                {formatCents(
                                    effectiveSubtotal + shippingFeeCents
                                )}
                            </span>
                        </div>
                        <Button type="submit" className="mt-2 w-full">
                            Siparişi Tamamla
                        </Button>
                        <p className="text-xs text-foreground/60">
                            Bu sayfa demo amaçlıdır; gerçek ödeme alınmaz.
                        </p>
                    </div>
                    <div className="bg-secondary/10 p-4 rounded-lg">
                        <div className="text-sm font-semibold">Test kartı</div>
                        <code>5528790000000008 10/30 CVC:000</code>
                    </div>
                </aside>
            </form>
        </div>
    )
}

function getDiscountCents(
    subtotalCents: number,
    coupon: Coupon | null
): number {
    if (!coupon) return 0
    if (coupon.status === 'expired' || coupon.status === 'used') return 0
    const now = Date.now()
    if (coupon.expiresAt && new Date(coupon.expiresAt).getTime() < now) return 0
    if (coupon.discountType === 'percent')
        return Math.min(
            subtotalCents,
            Math.floor((subtotalCents * coupon.discountValue) / 100)
        )
    return Math.min(subtotalCents, coupon.discountValue)
}
