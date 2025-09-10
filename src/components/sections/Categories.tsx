'use client'
import TitleWave from '../TitleWave'
import HorizontalSlider from '@/components/HorizontalSlider'
import CategoryCard from '@/components/CategoryCard'
import MoreButton from '@/components/MoreButton'
import {useCategories} from '../../hooks/useAPI'

export default function Categories() {
    const {data: categories = [], isLoading} = useCategories(true)

    // Fallback categories for loading/error states
    const fallbackCategories = [
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

    // Use API data if available, fallback to static data
    const displayCategories =
        categories.length > 0 ? categories : fallbackCategories

    return (
        <section className="mx-auto px-0 py-12">
            <TitleWave
                title="Categories"
                headingLevel={2}
                bandClass="text-secondary"
            />

            <div className="mt-6">
                {isLoading ? (
                    <div className="animate-pulse">
                        <HorizontalSlider cols={5}>
                            {[1, 2, 3, 4, 5].map(i => (
                                <div
                                    key={i}
                                    className="aspect-square bg-white/40 rounded-xl"></div>
                            ))}
                        </HorizontalSlider>
                    </div>
                ) : (
                    <HorizontalSlider cols={5}>
                        {displayCategories.map(c => (
                            <CategoryCard
                                key={c.name}
                                name={c.name}
                                image={c.image || ''}
                                href={`/shop?category=${encodeURIComponent(
                                    c.name
                                )}`}
                            />
                        ))}
                    </HorizontalSlider>
                )}
            </div>

            <MoreButton href="/shop?view=categories">
                Tüm kategoriler
            </MoreButton>
        </section>
    )
}
