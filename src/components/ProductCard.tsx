'use client'

import Image from 'next/image'
import Link from 'next/link'
import {formatCents, useCart} from '../context/CartContext'
import {Button} from './ui/button'
import {Card, CardContent, CardFooter} from './ui/card'
import type {Product} from '../types/product'
import type {CSSProperties} from 'react'
import {Badge} from './ui/badge'
import {Heart} from 'lucide-react'
import {useFavorites} from '@/context/FavoritesContext'

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
    const {isFavorite, toggleFavorite} = useFavorites()
    const fav = isFavorite(product.id)
    const hasColors = (product.colors?.length ?? 0) > 0

    return (
        <Card className="group transition-all py-0 bg-transparent shadow-none h-full">
            <div
                className={`${imageAspectClass} relative rounded-3xl`}
                style={
                    {
                        backgroundColor: hasColors ? swatch : ''
                    } as CSSProperties
                }>
                {hasColors && (
                    <>
                        <div
                            className={`absolute inset-0 flex items-center justify-center ${
                                small ? 'text-md' : 'text-2xl'
                            }`}>
                            {product.code}
                        </div>

                        <div
                            className={`absolute -top-6 -left-6 z-30 inline-block ${
                                small ? 'w-12 h-12' : 'w-20 h-20'
                            } rounded-full rounded-tl-none m-2 shadow-xl`}
                            style={{backgroundColor: swatch} as CSSProperties}
                        />
                    </>
                )}
                <Image
                    src={product.image || '/next.svg'}
                    alt={product.name}
                    fill
                    className={`rounded-3xl object-cover transition-all duration-300 ease-out group-hover:-translate-y-1 ${
                        hasColors
                            ? 'group-hover:opacity-0'
                            : 'group-hover:shadow-none'
                    } shadow-xl`}
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-2 right-2 z-30">
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label={fav ? 'Favoriden çıkar' : 'Favoriye ekle'}
                        className={`rounded-full bg-white/70 hover:bg-white/90 ${
                            small ? 'w-7 h-7' : 'w-9 h-9'
                        }`}
                        onClick={() => toggleFavorite(product.id)}>
                        <Heart
                            className={`${small ? 'w-4 h-4' : 'w-5 h-5'}`}
                            fill={fav ? 'var(--secondary)' : 'transparent'}
                            stroke={
                                fav ? 'var(--secondary)' : 'var(--foreground)'
                            }
                        />
                    </Button>
                </div>
            </div>
            <CardContent
                className={`flex-1 flex flex-col gap-2 text-center transition-all duration-300 ease-out group-hover:translate-y-1 ${
                    small ? 'text-xs px-0' : ''
                }`}>
                <Link
                    href={`/product/${product.slug}`}
                    className={`font-bold text-foreground hover:underline ${
                        small ? 'text-sm' : 'text-base'
                    }`}>
                    {product.name}
                </Link>
                <div
                    className={`${
                        small ? 'text-xs' : 'text-sm'
                    } text-foreground/70 line-clamp-2 gap-2 flex flex-wrap items-center justify-center`}>
                    <span>{product.code}</span> &#x2022;
                    <Badge variant="ghost" className="p-0">
                        {product.categories}
                    </Badge>
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
                            } text-foreground/60 line-through text-foreground-400`}>
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
