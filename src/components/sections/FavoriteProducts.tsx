'use client'

import React, {useEffect, useState} from 'react'
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

    const bannerIndex = 5

    const sliderItems: React.ReactNode[] = items.reduce<React.ReactNode[]>(
        (acc, p, i) => {
            acc.push(
                <div key={`product-${p.id}-${i}`} className="flex-shrink-0">
                    <ProductCard product={p} />
                </div>
            )

            if (i === bannerIndex) {
                acc.push(
                    <div
                        key="banner"
                        className="flex-shrink-0 aspect-square bg-gradient-to-r from-primary to-primary/60 
                     flex items-center justify-center rounded-3xl text-white font-bold">
                        Banner Alanı
                    </div>
                )
            }

            return acc
        },
        []
    )

    return (
        <section className="px-0 py-16">
            <TitleWave
                title="Favorite products"
                headingLevel={2}
                bandClass="text-secondary"
            />

            <div className="mt-6">
                <HorizontalSlider cols={6}>{sliderItems}</HorizontalSlider>
            </div>

            <MoreButton href="/shop?view=favorites">Tüm Favoriler</MoreButton>
        </section>
    )
}
