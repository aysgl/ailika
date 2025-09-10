// src/components/ShopPageClient.tsx
'use client'
import {useState, useEffect} from 'react'
import ProductGrid from '@/components/ProductGrid'
import ShopFilters from '@/components/ShopFilters'
import {Product} from '@/types'
import TitleWave from '../TitleWave'
import Breadcrumbs from '../Breadcrumbs'
import {Badge} from '../ui/badge'
import {Skeleton} from '../ui/skeleton'

export default function ShopPageClient({
    products,
    bc,
    categories,
    brands
}: {
    products: Product[]
    bc: {label: string; href?: string}[]
    categories: string[]
    brands: string[]
}) {
    const [filtered, setFiltered] = useState<Product[]>(products)
    const [loading, setLoading] = useState(true)

    const crumbs = bc?.length
        ? [{label: 'Anasayfa', href: '/'}, ...bc]
        : [{label: 'Anasayfa', href: '/'}, {label: 'Mağaza'}]

    const handleFilterChange = (category: string, brand: string) => {
        let result = products
        if (category)
            result = result.filter(p => (p.categories || []).includes(category))
        if (brand)
            result = result.filter(
                p => (p.code || '').toLowerCase() === brand.toLowerCase()
            )
        setFiltered(result)
    }

    useEffect(() => {
        setLoading(true)
        const timer = setTimeout(() => {
            setFiltered(products)
            setLoading(false)
        }, 400)
        return () => clearTimeout(timer)
    }, [products])

    return (
        <section className="container mx-auto lg:px-0 px-2 pb-12">
            <div className="mb-2 space-y-2">
                <div className="flex flex-col items-center justify-center mx-auto gap-2 bg-white/40 p-12 rounded-lg">
                    <TitleWave
                        title={bc?.length ? bc[bc.length - 1].label : 'Mağaza'}
                        bandClass="text-secondary"
                    />
                    <Breadcrumbs items={crumbs} />
                </div>
            </div>

            {/* Filtre Alanı */}
            <div className="flex items-center justify-between bg-white/40 rounded-xl p-4 mb-8">
                <div>
                    <Badge>{products.length}</Badge> ürün bulundu
                </div>
                <ShopFilters
                    categories={categories}
                    brands={brands}
                    onFilterChange={handleFilterChange}
                />
            </div>

            {/* Skeleton veya ProductGrid */}
            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {Array.from({length: 8}).map((_, i) => (
                        <Skeleton
                            key={i}
                            className="w-full aspect-square rounded-3xl bg-white/40"
                        />
                    ))}
                </div>
            ) : (
                <ProductGrid products={filtered} cols={4} />
            )}
        </section>
    )
}
