import Breadcrumbs from '@/components/Breadcrumbs'
import CategoryCard from '@/components/CategoryCard'
import CategoriesSection from '@/components/sections/Categories'
import TitleWave from '@/components/TitleWave'

export const dynamic = 'force-static'

export default function CategoriesPage() {
    const categories = [
        {
            name: 'Kalıcı Oje Koleksiyonu',
            image: 'https://www.dndgel.com/cdn/shop/collections/DIVA-COQUETTE-PROD_ef60f23a-8e20-4860-98e2-a0332dd60578.jpg?v=1741820965&width=1500'
        },
        {
            name: 'Jel Ojeler',
            image: 'https://www.dndgel.com/cdn/shop/collections/gel_art_liner.jpg?v=1717006411&width=1500'
        },
        {
            name: 'Top & Base Coat',
            image: 'https://www.dndgel.com/cdn/shop/collections/2023-Sheer-Collection-Color-Chart-copy.jpg?v=1712682727&width=1500'
        },
        {
            name: 'Favori Şablonlar',
            image: 'https://www.dndgel.com/cdn/shop/collections/GP-Square.jpg?v=1728423752'
        },
        {
            name: 'Fırçalama Setleri',
            image: 'https://www.dndgel.com/cdn/shop/collections/dc_sheer.jpg?v=1717012690'
        },
        {
            name: 'Törpüler',
            image: 'https://www.dndgel.com/cdn/shop/collections/mirrorball.jpg?v=1728327692&width=1500'
        },
        {
            name: 'Free Uçları',
            image: 'https://www.dndgel.com/cdn/shop/collections/DIY_Mani_18707047-d1d1-42ba-9154-df4515cbb9fa.jpg?v=1724375992&width=1500'
        },
        {
            name: 'Freeze Makinaları',
            image: 'https://www.dndgel.com/cdn/shop/collections/mood-change-18.jpg?v=1728348042'
        },
        {
            name: 'UV Kurutucular',
            image: 'https://www.dndgel.com/cdn/shop/collections/DIY_Mani_9fe89397-57bf-4d75-91f1-6abe0c972aef.jpg?v=1728326755&width=1500'
        },
        {
            name: 'Solüsyonlar',
            image: 'https://www.dndgel.com/cdn/shop/collections/resize_dnd_free_spirit-_copy.jpg?v=1717011974'
        },
        {
            name: 'Setler',
            image: 'https://www.dndgel.com/cdn/shop/collections/resize_dnd_free_spirit-_copy.jpg?v=1717011974'
        }
    ]

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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map(c => (
                    <CategoryCard
                        key={c.name}
                        name={c.name}
                        image={c.image}
                        href={`/shop?view=categories&category=${c.name}`}
                    />
                ))}
            </div>
        </div>
    )
}
