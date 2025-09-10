'use client'

import Breadcrumbs from '@/components/Breadcrumbs'
import CategoryCard from '@/components/CategoryCard'
import TitleWave from '@/components/TitleWave'
import {useCategories} from '@/hooks/useCategories'
import {Category} from '@/types'

export default function CategoriesPage() {
    const {data: categories, isLoading, error} = useCategories()

    if (isLoading) return <p>Yükleniyor...</p>
    if (error) return <p>Hata oluştu</p>

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-8 space-y-2">
                <div className="flex flex-col items-center justify-center mx-auto gap-2 bg-white/40 p-12 rounded-lg">
                    <TitleWave title="Kategoriler" bandClass="text-secondary" />
                    <Breadcrumbs
                        items={[
                            {label: 'Anasayfa', href: '/'},
                            {label: 'Kategoriler'}
                        ]}
                    />
                </div>
            </div>
            {/* Loading ve Error durumları */}
            {isLoading && (
                <p className="text-center text-gray-500">Yükleniyor...</p>
            )}
            {error && <p className="text-center text-red-500">Hata oluştu</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories &&
                    categories.data.map((c: Category) => (
                        <CategoryCard
                            key={c.id}
                            name={c.name}
                            image={c.image || ''}
                            href={`/shop?category=${c.slug}`}
                        />
                    ))}
            </div>
        </div>
    )
}
