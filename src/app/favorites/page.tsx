'use client'

import TitleWave from '@/components/TitleWave'
import Breadcrumbs from '@/components/Breadcrumbs'
import ProductGrid from '@/components/ProductGrid'
import {useFavorites} from '@/context/FavoritesContext'
import {products as allProducts} from '@/lib/products'
import EmptyState from '@/components/EmptyState'
import Link from 'next/link'
import {Heart} from 'lucide-react'
import {Button} from '@/components/ui/button'

export default function FavoritesPage() {
    const {favorites} = useFavorites()
    const products = allProducts.filter(p => favorites.includes(p.id))
    return (
        <div className="container mx-auto pb-16">
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
                    <div className="mb-8 space-y-2">
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
                    <ProductGrid products={products} cols={4} />
                </>
            )}
        </div>
    )
}
