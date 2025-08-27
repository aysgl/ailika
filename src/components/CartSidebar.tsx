'use client'

import Image from 'next/image'
import Link from 'next/link'
import {useMemo} from 'react'
import {useCart, formatCents} from '@/context/CartContext'
import {Button} from '@/components/ui/button'
import {X, Plus, Minus, Trash} from 'lucide-react'
import {getProductById, products as allProducts} from '@/lib/products'
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetClose
} from '@/components/ui/sheet'
import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarFooter
} from '@/components/ui/sidebar'

export default function CartSidebar() {
    const {
        items,
        updateQuantity,
        removeFromCart,
        addToCart,
        subtotalCents,
        isCartOpen,
        closeCart
    } = useCart()

    const recommended = useMemo(() => {
        const inCartIds = new Set(items.map(it => it.productId))
        return allProducts
            .filter(p => p.oldPrice && !inCartIds.has(p.id))
            .slice(0, 3)
    }, [items])

    return (
        <Sheet
            open={isCartOpen}
            onOpenChange={open => (open ? undefined : closeCart())}>
            <SheetContent
                side="right"
                className="p-2 rounded-2xl w-full sm:w-[420px] md:w-[45%] h-[calc(100dvh-1rem)]">
                <SheetTitle className="sr-only">Cart</SheetTitle>
                <Sidebar className="h-full min-h-0">
                    <SidebarHeader>
                        <div className="flex items-center justify-between w-full">
                            <h3 className="text-lg font-semibold">
                                Your Bag (
                                {items.reduce((s, it) => s + it.quantity, 0)})
                            </h3>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={closeCart}
                                aria-label="Kapat">
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <div className="divide-y">
                            {items.length === 0 ? (
                                <div className="p-6 text-sm text-foreground-600">
                                    Sepetiniz boş.
                                </div>
                            ) : (
                                items.map(it => {
                                    const p = getProductById(it.productId)
                                    if (!p) return null
                                    return (
                                        <div
                                            key={it.productId}
                                            className="flex gap-12 items-center justify-between p-4">
                                            <div className="flex items-center gap-2 w-1/2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() =>
                                                        removeFromCart(p.id)
                                                    }
                                                    className="text-primary hover:text-foreground-900">
                                                    <Trash className="w-4 h-4" />
                                                </Button>
                                                <div className="relative w-20 h-24 shrink-0 overflow-hidden rounded-md bg-foreground-100">
                                                    <Image
                                                        src={
                                                            p.image ||
                                                            '/next.svg'
                                                        }
                                                        alt={p.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <SheetClose asChild>
                                                        <Link
                                                            href={`/product/${p.slug}`}
                                                            className="font-medium hover:underline">
                                                            {p.name}
                                                        </Link>
                                                    </SheetClose>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    className="w-6 h-6"
                                                    size="icon"
                                                    aria-label={`Azalt: ${p.name}`}
                                                    onClick={() =>
                                                        updateQuantity(
                                                            p.id,
                                                            it.quantity - 1
                                                        )
                                                    }>
                                                    <Minus className="w-4 h-4" />
                                                </Button>
                                                <span className="w-6 text-center">
                                                    {it.quantity}
                                                </span>
                                                <Button
                                                    variant="outline"
                                                    className="w-6 h-6"
                                                    size="icon"
                                                    aria-label={`Artır: ${p.name}`}
                                                    onClick={() =>
                                                        updateQuantity(
                                                            p.id,
                                                            it.quantity + 1
                                                        )
                                                    }>
                                                    <Plus className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            <div>
                                                <span className="text-xl font-semibold">
                                                    {formatCents(
                                                        p.price * it.quantity
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    </SidebarContent>
                    <SidebarFooter>
                        <div className="p-4 space-y-2">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-sm font-bold text-foreground-600">
                                        Subtotal
                                    </span>
                                    <p className="text-sm text-foreground-500">
                                        Taxes and shipping calculated at
                                        checkout.
                                    </p>
                                </div>
                                <span className="font-semibold text-3xl">
                                    {formatCents(subtotalCents)}
                                </span>
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <SheetClose asChild>
                                    <Link href="/cart">
                                        <Button
                                            variant="outline"
                                            className="w-full">
                                            View Bag
                                        </Button>
                                    </Link>
                                </SheetClose>
                                <Button>Checkout Now</Button>
                            </div>
                        </div>
                        <div className="border-primary border-dotted border-t-3 p-4 space-y-3">
                            <h4 className="font-semibold">
                                We Recommend {recommended.length}
                            </h4>
                            {recommended.length === 0 ? (
                                <div className="text-sm text-foreground-600">
                                    Loading...
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {recommended.map(r => (
                                        <div
                                            key={r.id}
                                            className="flex items-center gap-3">
                                            <div className="relative w-14 h-16 shrink-0 overflow-hidden rounded-md bg-foreground-100">
                                                <Image
                                                    src={r.image || '/next.svg'}
                                                    alt={r.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-medium truncate">
                                                    {r.name}
                                                </div>
                                                <div className="flex items-baseline gap-2 text-sm">
                                                    {r.oldPrice && (
                                                        <span className="line-through text-foreground-400">
                                                            {formatCents(
                                                                r.oldPrice
                                                            )}
                                                        </span>
                                                    )}
                                                    <span className="font-semibold text-primary">
                                                        {formatCents(r.price)}
                                                    </span>
                                                    {r.oldPrice && (
                                                        <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                                                            Sale
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <Button
                                                size="sm"
                                                onClick={() =>
                                                    addToCart(r.id, 1)
                                                }
                                                aria-label={`${r.name} sepete ekle`}>
                                                Add to Bag
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </SidebarFooter>
                </Sidebar>
            </SheetContent>
        </Sheet>
    )
}
