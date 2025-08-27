'use client'

import Image from 'next/image'
import Link from 'next/link'
import {formatCents, useCart} from '../context/CartContext'
import {Button} from './ui/button'
import {Card, CardContent, CardFooter} from './ui/card'
import type {Product} from '../types/product'

export default function ProductCard({product}: {product: Product}) {
    const {addToCart, removeFromCart, items, openCart} = useCart()
    const inCart = items.some(it => it.productId === product.id)

    return (
        <Card className="group py-0 bg-transparent overflow-hidden shadow-none">
            <div className="aspect-[3/4] relative ">
                <Image
                    src={product.image || '/next.svg'}
                    alt={product.name}
                    fill
                    className="rounded-2xl object-cover shadow-lg hover:shadow-none transition-all duration-300 ease-out group-hover:-translate-y-2"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
            </div>
            <CardContent className="p-4 flex-1 flex flex-col gap-2 text-center">
                <Link
                    href={`/product/${product.slug}`}
                    className="font-bold hover:underline">
                    {product.name}
                </Link>
                <div className="text-sm text-zinc/70 line-clamp-2">
                    {product.description}
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex items-center justify-between">
                {product.oldPrice ? (
                    <div className="flex items-baseline gap-2">
                        <span className="text-sm line-through text-zinc-400">
                            {formatCents(product.oldPrice)}
                        </span>
                        <span className="font-semibold text-red-600">
                            {formatCents(product.price)}
                        </span>
                    </div>
                ) : (
                    <span className="font-semibold">
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
                        className="bg-transparent border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
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
