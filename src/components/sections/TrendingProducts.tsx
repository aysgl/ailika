'use client'

import {useEffect, useState} from 'react'
import TitleWave from '../TitleWave'
import ProductCard from '@/components/ProductCard'
import HorizontalSlider from '@/components/HorizontalSlider'
import type {Product} from '@/types/product'
import {api} from '@/lib/api'
import MoreButton from '../MoreButton'

export default function TrendingProducts() {
    const [items, setItems] = useState<Product[]>([])

    useEffect(() => {
        api.listProducts()
            .then(ps => setItems(ps.slice(0, 12)))
            .catch(() => setItems([]))
    }, [])

    return (
        <section className="px-0 py-16">
            <TitleWave
                title="Trending"
                headingLevel={2}
                bandClass="text-secondary"
            />

            <div className="mt-6">
                <HorizontalSlider cols={6}>
                    {items.map((p, i) => (
                        <ProductCard key={`${p.id}-${i}`} product={p} />
                    ))}
                </HorizontalSlider>
            </div>
            <MoreButton href="/shop?view=categories">Tüm Trendler</MoreButton>
        </section>
    )
}
