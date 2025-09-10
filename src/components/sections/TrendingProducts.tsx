// components/TrendingProducts.tsx
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
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        api.listProducts()
            .then(ps => {
                setItems(ps.slice(0, 12))
                setIsLoading(false)
            })
            .catch(() => {
                setItems([])
                setIsLoading(false)
            })
    }, [])

    const bannerIndex = 2

    // Slider items: loading ise skeleton, değilse ürünler
    const sliderItems: React.ReactNode[] = isLoading
        ? Array.from({length: 12}).map((_, i) =>
              i === bannerIndex ? (
                  <div
                      key={`banner-skeleton-${i}`}
                      className="flex-shrink-0 w-36 h-48 mx-1 rounded-xl bg-gradient-to-r from-primary/30 to-primary/10 animate-pulse flex items-center justify-center text-white font-bold">
                      Banner
                  </div>
              ) : (
                  <div
                      key={`skeleton-${i}`}
                      className="flex-shrink-0 w-36 h-48 mx-1 animate-pulse bg-gray-200 rounded-xl flex flex-col justify-end p-2">
                      <div className="h-6 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </div>
              )
          )
        : items.reduce<React.ReactNode[]>((acc, p, i) => {
              acc.push(
                  <div
                      key={`product-${p.id}-${i}`}
                      className="flex-shrink-0 mx-1">
                      <ProductCard product={p} />
                  </div>
              )
              if (i === bannerIndex) {
                  acc.push(
                      <div
                          key="banner"
                          className="flex-shrink-0 w-36 h-48 mx-1 rounded-xl bg-gradient-to-r from-primary to-primary/60 flex items-center justify-center text-white font-bold">
                          Banner Alanı
                      </div>
                  )
              }
              return acc
          }, [])

    return (
        <section className="mx-auto px-0 py-12">
            <TitleWave
                title="Trending"
                headingLevel={2}
                bandClass="text-secondary"
            />

            <div className="mt-6">
                <HorizontalSlider cols={6} isLoading={isLoading}>
                    {sliderItems}
                </HorizontalSlider>
            </div>

            <MoreButton href="/shop?view=categories">Tüm Trendler</MoreButton>
        </section>
    )
}
