'use client'

import {useEffect, useMemo, useState} from 'react'
import TitleWave from '@/components/TitleWave'
import Breadcrumbs from '@/components/Breadcrumbs'
import ProductGrid from '@/components/ProductGrid'
import {useFavorites} from '@/context/FavoritesContext'
import {products as allProducts} from '@/lib/products'
import EmptyState from '@/components/EmptyState'
import Link from 'next/link'
import {Heart} from 'lucide-react'
import {Button} from '@/components/ui/button'
import ShopFilters from '@/components/ShopFilters'
import {Skeleton} from '@/components/ui/skeleton'
import {Product} from '@/types'
import {Badge} from '@/components/ui/badge'

export default function FavoritesPage() {
    const {favorites} = useFavorites()
    const [loading, setLoading] = useState(true)
    const [filtered, setFiltered] = useState<Product[]>([])
    const [categories, setCategories] = useState<string[]>([])
    const [brands, setBrands] = useState<string[]>([])

    // Favori ürünleri al
    const products = useMemo(
        () => allProducts.filter(p => favorites.includes(p.id)),
        [favorites]
    )

    // Simule yüklenme süresi
    useEffect(() => {
        const timer = setTimeout(() => {
            setFiltered(products)
            setLoading(false)
        }, 800)
        return () => clearTimeout(timer)
    }, [products])

    // Kategori ve marka listelerini ayarla
    useEffect(() => {
        if (products.length > 0) {
            const uniqueCategories = Array.from(
                new Set(products.flatMap(p => p.categories || []))
            )
            const uniqueBrands = Array.from(
                new Set(products.map(p => (p.code || '').toLowerCase()))
            )
            setCategories(uniqueCategories)
            setBrands(uniqueBrands)
        } else {
            setCategories([])
            setBrands([])
        }
    }, [products])

    // Filtreleme mantığı
    const handleFilterChange = (category: string, brand: string) => {
        let result = products
        if (category) {
            result = result.filter(p => (p.categories || []).includes(category))
        }
        if (brand) {
            result = result.filter(
                p => (p.code || '').toLowerCase() === brand.toLowerCase()
            )
        }
        setFiltered(result)
    }

    return (
        <div className="container mx-auto lg:px-0 px-2 pb-12">
            {products.length === 0 ? (
                <EmptyState
                    icon={<Heart className="w-10 h-10 text-secondary" />}
                    title="Henüz favoriniz yok"
                    description="Beğendiğiniz ürünleri kalp ikonuyla favorilerinize ekleyebilirsiniz."
                    action={
                        <Button asChild variant="default">
                            <Link href="/">Anasayfa</Link>
                        </Button>
                    }
                    className="bg-white/60 rounded-xl py-16"
                />
            ) : (
                <>
                    <div className="mb-2 space-y-2">
                        <div className="flex flex-col items-center justify-center mx-auto gap-2 bg-white/40 p-12 rounded-lg">
                            <TitleWave
                                title="Favoriler"
                                bandClass="text-secondary"
                            />
                            <Breadcrumbs
                                items={[
                                    {label: 'Anasayfa', href: '/'},
                                    {label: 'Favoriler'}
                                ]}
                            />
                        </div>
                    </div>

                    {/* Filtre Alanı */}
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white/40 rounded-xl p-4 mb-8">
                        <div className="">
                            <Badge>{favorites.length}</Badge> favori ürününüz
                            var
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
                </>
            )}
        </div>
    )
}
