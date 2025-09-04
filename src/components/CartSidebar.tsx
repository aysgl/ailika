'use client'

import Link from 'next/link'
import {useMemo} from 'react'
import {useCart, formatCents} from '@/context/CartContext'
import {Button} from '@/components/ui/button'
import {X, ShoppingCart, Phone} from 'lucide-react'
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
import HorizontalSlider from '@/components/HorizontalSlider'
import ProductCard from '@/components/ProductCard'
import type {Product} from '@/types/product'
import EmptyState from './EmptyState'
import CartItemRow from './CartItemRow'

export default function CartSidebar() {
    const {
        items,
        updateQuantity,
        removeFromCart,
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
                className="rounded-2xl w-full sm:w-[420px] md:w-[45%] h-[calc(100dvh-1rem)]">
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
                                <div className="flex items-center justify-center h-full">
                                    <EmptyState
                                        icon={
                                            <ShoppingCart className="w-10 h-10 text-primary" />
                                        }
                                        title="Your bag is empty"
                                        description="Add items to your bag to get started."
                                    />
                                </div>
                            ) : (
                                items.map(it => {
                                    const p = getProductById(it.productId)
                                    if (!p) return null
                                    return (
                                        <CartItemRow
                                            key={it.productId}
                                            slug={p.slug}
                                            name={p.name}
                                            code={p.code}
                                            image={p.image}
                                            priceCents={p.price}
                                            quantity={it.quantity}
                                            onRemove={() =>
                                                removeFromCart(p.id)
                                            }
                                            onDecrease={() =>
                                                updateQuantity(
                                                    p.id,
                                                    it.quantity - 1
                                                )
                                            }
                                            onIncrease={() =>
                                                updateQuantity(
                                                    p.id,
                                                    it.quantity + 1
                                                )
                                            }
                                            formatCents={formatCents}
                                            onNavigate={closeCart}
                                        />
                                    )
                                })
                            )}
                        </div>
                        {items.length > 0 && recommended.length > 0 && (
                            <div className="border-t">
                                <h4 className="font-semibold p-4">
                                    We Recommend ({recommended.length})
                                </h4>
                                <HorizontalSlider
                                    pad
                                    grid={{
                                        base: 1.2,
                                        sm: 2,
                                        md: 3,
                                        lg: 4
                                    }}>
                                    {(recommended as Product[]).map(r => (
                                        <ProductCard
                                            small
                                            key={r.id}
                                            product={r}
                                            imageAspectClass="aspect-[1/1]"
                                        />
                                    ))}
                                </HorizontalSlider>
                            </div>
                        )}
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
                                            Sepetim
                                        </Button>
                                    </Link>
                                </SheetClose>
                                <Link href="/#">
                                    <Button variant="outline">
                                        <Phone /> Whatsapp&apos;tan Sipariş
                                    </Button>
                                </Link>
                                <Link href="/checkout">
                                    <Button variant="secondary">
                                        Hemen Öde
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </SidebarFooter>
                </Sidebar>
            </SheetContent>
        </Sheet>
    )
}
