'use client'

import Image from 'next/image'
import Link from 'next/link'
import {formatCents, useCart} from '../context/CartContext'
import {Button} from './ui/button'
import {Card, CardContent, CardFooter} from './ui/card'
import type {Product} from '../types/product'
import type {CSSProperties} from 'react'
import {Badge} from './ui/badge'

type ProductCardProps = {
    product: Product
    imageAspectClass?: string
    small?: boolean
}

export default function ProductCard({
    product,
    imageAspectClass = 'aspect-[1/1]',
    small = false
}: ProductCardProps) {
    const {addToCart, removeFromCart, items, openCart} = useCart()
    const inCart = items.some(it => it.productId === product.id)
    const swatch = product.colors?.[0] ?? '#ccc'

    return (
        <Card className="group transition-all py-0 bg-transparent shadow-none h-full">
            <div
                className={`${imageAspectClass} relative rounded-3xl`}
                style={{backgroundColor: swatch} as CSSProperties}>
                <div
                    className={`absolute inset-0 flex items-center justify-center ${
                        small ? 'text-md' : 'text-2xl'
                    }`}>
                    {product.code}
                </div>
                <Image
                    src={product.image || '/next.svg'}
                    alt={product.name}
                    fill
                    className="rounded-3xl object-cover transition-opacity duration-300 ease-out group-hover:opacity-0 shadow-xl"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute -top-4 -right-4 w-full h-full flex items-start justify-end z-20">
                    <div
                        className={`${
                            small ? 'w-10 h-10' : 'w-20 h-20'
                        } rounded-full rounded-tr-none m-2 shadow-xl`}
                        style={{backgroundColor: swatch} as CSSProperties}
                    />
                </div>
            </div>
            <CardContent
                className={`flex-1 flex flex-col gap-2 text-center ${
                    small ? 'text-xs px-0' : ''
                }`}>
                <Link
                    href={`/product/${product.slug}`}
                    className={`font-bold hover:underline ${
                        small ? 'text-sm' : 'text-base'
                    }`}>
                    {product.name}
                </Link>
                <div
                    className={`${
                        small ? 'text-xs' : 'text-sm'
                    } text-foreground/70 line-clamp-2 gap-2`}>
                    <Badge variant="ghost">{product.code}</Badge> &#x2022;
                    <Badge variant="ghost">{product.categories}</Badge>
                </div>
            </CardContent>
            <CardFooter
                className={`p-4 pt-0 block text-center ${
                    small ? 'text-sm' : ''
                }`}>
                {product.oldPrice ? (
                    <div className="flex items-center justify-center gap-2">
                        <span
                            className={`${
                                small ? 'text-xs' : 'text-sm'
                            } line-through text-foreground-400`}>
                            {formatCents(product.oldPrice)}
                        </span>
                        <span
                            className={`font-semibold text-foreground ${
                                small ? 'text-sm' : ''
                            }`}>
                            {formatCents(product.price)}
                        </span>
                    </div>
                ) : (
                    <span
                        className={`font-semibold text-foreground ${
                            small ? 'text-sm' : ''
                        }`}>
                        {formatCents(product.price)}
                    </span>
                )}
                <div className="flex justify-center mt-2">
                    {inCart ? (
                        <Button
                            variant="destructive"
                            size={small ? 'sm' : 'sm'}
                            onClick={() => removeFromCart(product.id)}
                            aria-label={`${product.name} sepetten çıkar`}>
                            Sepetten Çıkar
                        </Button>
                    ) : (
                        <Button
                            variant="outline"
                            size={small ? 'sm' : 'sm'}
                            onClick={() => {
                                addToCart(product.id, 1)
                                openCart()
                            }}
                            aria-label={`${product.name} sepete ekle`}>
                            Sepete Ekle
                        </Button>
                    )}
                </div>
            </CardFooter>
        </Card>
    )
}
