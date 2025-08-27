'use client'

import Image from 'next/image'
import Link from 'next/link'
import {formatCents, useCart} from '../context/CartContext'
import {Button} from './ui/button'
import {Card, CardContent, CardFooter} from './ui/card'
import type {Product} from '../types/product'
import type {CSSProperties} from 'react'

export default function ProductCard({product}: {product: Product}) {
    const {addToCart, removeFromCart, items, openCart} = useCart()
    const inCart = items.some(it => it.productId === product.id)
    const swatch = product.colors?.[0] ?? '#ccc'

    return (
        <Card className="group transition-all py-0 bg-transparent shadow-none h-full ">
            <div
                className="aspect-[3/4] relative rounded-3xl"
                style={{backgroundColor: swatch} as CSSProperties}>
                <Image
                    src={product.image || '/next.svg'}
                    alt={product.name}
                    fill
                    className="rounded-3xl object-cover transition-opacity duration-300 ease-out group-hover:opacity-0"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute -top-4 -right-4 w-full h-full flex items-start justify-end z-50">
                    <div
                        className="w-20 h-20 rounded-full rounded-tr-none m-2 shadow-xl"
                        style={{backgroundColor: swatch} as CSSProperties}
                    />
                </div>
            </div>
            <CardContent className="p-4 flex-1 flex flex-col gap-2 text-center">
                <Link
                    href={`/product/${product.slug}`}
                    className="font-bold hover:underline">
                    {product.name}
                </Link>
                <div className="text-sm text-foreground/70 line-clamp-2">
                    {product.description}
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex items-center justify-between">
                {product.oldPrice ? (
                    <div className="flex items-baseline gap-2">
                        <span className="text-sm line-through text-foreground-400">
                            {formatCents(product.oldPrice)}
                        </span>
                        <span className="font-semibold text-foreground">
                            {formatCents(product.price)}
                        </span>
                    </div>
                ) : (
                    <span className="font-semibold text-foreground">
                        {formatCents(product.price)}
                    </span>
                )}
                {inCart ? (
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeFromCart(product.id)}
                        aria-label={`${product.name} sepetten çıkar`}>
                        Sepetten Çıkar
                    </Button>
                ) : (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            addToCart(product.id, 1)
                            openCart()
                        }}
                        aria-label={`${product.name} sepete ekle`}>
                        Sepete Ekle
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}
