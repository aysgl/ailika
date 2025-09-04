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
                className="rounded-2xl w-auto sm:w-[400px] md:w-[45%] h-[calc(100dvh-1rem)] p-0">
                <SheetTitle className="sr-only">Cart</SheetTitle>
                <Sidebar className="h-full min-h-0">
                    <SidebarHeader className="p-4">
                        <div className="flex items-center justify-between w-full">
                            <h3 className="text-base sm:text-lg font-semibold">
                                Your Bag (
                                {items.reduce((s, it) => s + it.quantity, 0)})
                            </h3>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={closeCart}
                                aria-label="Kapat">
                                <X className="w-4 h-4 sm:w-5 sm:h-5" />
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
                                <h4 className="font-semibold p-3 sm:p-4 text-sm sm:text-base">
                                    We Recommend ({recommended.length})
                                </h4>
                                <HorizontalSlider
                                    pad
                                    grid={{
                                        base: 1.1,
                                        sm: 1.5,
                                        md: 2,
                                        lg: 3
                                    }}>
                                    {(recommended as Product[]).map(r => (
                                        <ProductCard
                                            small
                                            key={r.id}
                                            product={r}
                                        />
                                    ))}
                                </HorizontalSlider>
                            </div>
                        )}
                    </SidebarContent>
                    <SidebarFooter>
                        <div className="p-3 sm:p-4 space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div>
                                    <span className="text-xs sm:text-sm font-bold text-foreground-600">
                                        Subtotal
                                    </span>
                                    <p className="text-xs sm:text-sm text-foreground-500">
                                        Taxes and shipping calculated at
                                        checkout.
                                    </p>
                                </div>
                                <span className="font-semibold text-xl sm:text-3xl">
                                    {formatCents(subtotalCents)}
                                </span>
                            </div>

                            {/* Mobile: Stacked buttons, Desktop: Horizontal */}
                            <div className="flex flex-col sm:flex-row gap-2 pt-2">
                                <SheetClose asChild>
                                    <Link href="/cart" className="flex-1">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full text-xs sm:text-sm">
                                            Sepetim
                                        </Button>
                                    </Link>
                                </SheetClose>
                                <Link href="/#" className="flex-1">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full text-xs sm:text-sm">
                                        <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                                        <span className="hidden sm:inline">
                                            Whatsapp&apos;tan Sipariş
                                        </span>
                                        <span className="sm:hidden">
                                            WhatsApp
                                        </span>
                                    </Button>
                                </Link>
                                <Link href="/checkout" className="flex-1">
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="w-full text-xs sm:text-sm">
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
