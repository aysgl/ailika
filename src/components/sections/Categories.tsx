'use client'
import TitleWave from '../TitleWave'
import HorizontalSlider from '@/components/HorizontalSlider'
import CategoryCard from '@/components/CategoryCard'
import MoreButton from '@/components/MoreButton'

export default function Categories() {
    const categories = [
        {
            name: 'DIVA Coquette Collection',
            image: 'https://www.dndgel.com/cdn/shop/collections/DIVA-COQUETTE-PROD_ef60f23a-8e20-4860-98e2-a0332dd60578.jpg?v=1741820965&width=1500'
        },
        {
            name: 'Gel Art Liners',
            image: 'https://www.dndgel.com/cdn/shop/collections/gel_art_liner.jpg?v=1717006411&width=1500'
        },
        {
            name: 'Ailika Sheer Collection',
            image: 'https://www.dndgel.com/cdn/shop/collections/2023-Sheer-Collection-Color-Chart-copy.jpg?v=1712682727&width=1500'
        },
        {
            name: 'Guilty Pleasures Collection',
            image: 'https://www.dndgel.com/cdn/shop/collections/GP-Square.jpg?v=1728423752'
        },
        {
            name: 'DC Sheer Collection',
            image: 'https://www.dndgel.com/cdn/shop/collections/dc_sheer.jpg?v=1717012690'
        },
        {
            name: 'DIVA Mirrorball Collection',
            image: 'https://www.dndgel.com/cdn/shop/collections/mirrorball.jpg?v=1728327692&width=1500'
        },
        {
            name: 'Nail Essentials',
            image: 'https://www.dndgel.com/cdn/shop/collections/DIY_Mani_18707047-d1d1-42ba-9154-df4515cbb9fa.jpg?v=1724375992&width=1500'
        },
        {
            name: 'DC Mood Change',
            image: 'https://www.dndgel.com/cdn/shop/collections/mood-change-18.jpg?v=1728348042'
        },
        {
            name: 'Gel Starter Kit',
            image: 'https://www.dndgel.com/cdn/shop/collections/DIY_Mani_9fe89397-57bf-4d75-91f1-6abe0c972aef.jpg?v=1728326755&width=1500'
        },
        {
            name: 'DC Free Spirit Collection',
            image: 'https://www.dndgel.com/cdn/shop/collections/resize_dnd_free_spirit-_copy.jpg?v=1717011974'
        }
    ]

    return (
        <section className="px-0 py-12">
            <TitleWave
                title="Categories"
                headingLevel={2}
                bandClass="text-secondary"
            />

            <div className="mt-6">
                <HorizontalSlider>
                    {categories.map(c => (
                        <div
                            key={c.name}
                            className="snap-center min-w-[80%] sm:min-w-[50%] md:min-w-[33.3333%] lg:min-w-[25%]">
                            <CategoryCard
                                name={c.name}
                                image={c.image}
                                href={`/shop?category=${encodeURIComponent(
                                    c.name
                                )}`}
                            />
                        </div>
                    ))}
                </HorizontalSlider>
            </div>

            <MoreButton href="/shop?view=categories">
                Tüm kategoriler
            </MoreButton>
        </section>
    )
}
