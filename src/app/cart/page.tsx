'use client'

import Link from 'next/link'
import Image from 'next/image'
import {useCart, formatCents} from '../../context/CartContext'
import {useProducts} from '../../hooks/useProducts'
import {Button} from '../../components/ui/button'

export default function CartPage() {
    const {items, updateQuantity, removeFromCart, subtotalCents, clearCart} =
        useCart()
    const {products, loading} = useProducts()

    if (items.length === 0) {
        return (
            <div className="py-12 text-center">
                <p>Sepetiniz boş.</p>
                <Link href="/shop" className="inline-block mt-4 underline">
                    Alışverişe devam et
                </Link>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
            <div className="space-y-4">
                {loading && (
                    <div className="text-sm text-foreground">
                        Ürünler yükleniyor...
                    </div>
                )}
                {items.map(it => {
                    const product = products.find(p => p.id === it.productId)
                    if (!product) return null
                    return (
                        <div
                            key={it.productId}
                            className="flex items-center gap-4 shadow-xl rounded-lg p-3 bg-white">
                            <div className="relative w-20 h-20">
                                <Image
                                    src={product.image || '/next.svg'}
                                    alt={product.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium">
                                    {product.name}
                                </div>
                                <div className="text-sm text-foreground/60">
                                    {formatCents(product.price)}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        updateQuantity(
                                            it.productId,
                                            it.quantity - 1
                                        )
                                    }>
                                    -
                                </Button>
                                <span className="w-6 text-center">
                                    {it.quantity}
                                </span>
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        updateQuantity(
                                            it.productId,
                                            it.quantity + 1
                                        )
                                    }>
                                    +
                                </Button>
                            </div>
                            <button
                                className="ml-4 text-sm underline"
                                onClick={() => removeFromCart(it.productId)}>
                                Kaldır
                            </button>
                        </div>
                    )
                })}
            </div>
            <aside className="border border-foreground/10 rounded-lg p-4 h-max bg-white">
                <div className="flex items-center justify-between">
                    <span>Ara toplam</span>
                    <strong>{formatCents(subtotalCents)}</strong>
                </div>
                <Button className="mt-4 w-full">Ödeme (Demo)</Button>
                <button
                    className="mt-2 w-full text-sm underline text-foreground/70"
                    onClick={clearCart}>
                    Sepeti temizle
                </button>
                <Link href="/shop" className="mt-2 block text-center underline">
                    Alışverişe devam et
                </Link>
            </aside>
        </div>
    )
}
