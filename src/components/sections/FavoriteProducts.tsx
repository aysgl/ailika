'use client'

import {useEffect, useState} from 'react'
import TitleWave from '../TitleWave'
import ProductCard from '@/components/ProductCard'
import HorizontalSlider from '@/components/HorizontalSlider'
import type {Product} from '@/types/product'
import {api} from '@/lib/api'
import MoreButton from '../MoreButton'

export default function FavoriteProducts() {
    const [items, setItems] = useState<Product[]>([])

    useEffect(() => {
        api.listProducts()
            .then(ps => setItems(ps.slice(0, 12)))
            .catch(() => setItems([]))
    }, [])

    return (
        <section className="px-0 py-16">
            <TitleWave
                title="Favorite products"
                headingLevel={2}
                bandClass="text-secondary"
            />

            <div className="mt-6">
                <HorizontalSlider cols={5}>
                    {items.map((p, i) => (
                        <div
                            key={`${p.id}-${i}`}
                            className="snap-center min-w-[80%] sm:min-w-[50%] md:min-w-[33.3333%] lg:min-w-[20%]">
                            <ProductCard
                                product={p}
                                imageAspectClass="sm:aspect-[4/5] md:aspect-[1/1]"
                            />
                        </div>
                    ))}
                </HorizontalSlider>
            </div>
            <MoreButton href="/shop?view=favorites">Tüm Favoriler</MoreButton>
        </section>
    )
}
