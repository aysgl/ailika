import {Category} from '@/types/category'

export const categories: Category[] = [
    {
        id: 'cat-1',
        slug: 'kalici-oje-koleksiyonu',
        name: 'Kalıcı Oje Koleksiyonu',
        image: 'https://www.dndgel.com/cdn/shop/collections/DIVA-COQUETTE-PROD_ef60f23a-8e20-4860-98e2-a0332dd60578.jpg?v=1741820965&width=1500'
    },
    {
        id: 'cat-2',
        slug: 'jel-ojeler',
        name: 'Jel Ojeler',
        image: 'https://www.dndgel.com/cdn/shop/collections/gel_art_liner.jpg?v=1717006411&width=1500'
    },
    {
        id: 'cat-3',
        slug: 'top-base-coat',
        name: 'Top & Base Coat',
        image: 'https://www.dndgel.com/cdn/shop/collections/2023-Sheer-Collection-Color-Chart-copy.jpg?v=1712682727&width=1500'
    },
    {
        id: 'cat-4',
        slug: 'favori-sablonlar',
        name: 'Favori Şablonlar',
        image: 'https://www.dndgel.com/cdn/shop/collections/GP-Square.jpg?v=1728423752'
    },
    {
        id: 'cat-5',
        slug: 'fircalama-setleri',
        name: 'Fırçalama Setleri',
        image: 'https://www.dndgel.com/cdn/shop/collections/dc_sheer.jpg?v=1717012690'
    },
    {
        id: 'cat-6',
        slug: 'torpuler',
        name: 'Törpüler',
        image: 'https://www.dndgel.com/cdn/shop/collections/mirrorball.jpg?v=1728327692&width=1500'
    },
    {
        id: 'cat-7',
        slug: 'free-uclari',
        name: 'Free Uçları',
        image: 'https://www.dndgel.com/cdn/shop/collections/DIY_Mani_18707047-d1d1-42ba-9154-df4515cbb9fa.jpg?v=1724375992&width=1500'
    },
    {
        id: 'cat-8',
        slug: 'freeze-makinalari',
        name: 'Freeze Makinaları',
        image: 'https://www.dndgel.com/cdn/shop/collections/mood-change-18.jpg?v=1728348042'
    },
    {
        id: 'cat-9',
        slug: 'uv-kurutucular',
        name: 'UV Kurutucular',
        image: 'https://www.dndgel.com/cdn/shop/collections/DIY_Mani_9fe89397-57bf-4d75-91f1-6abe0c972aef.jpg?v=1728326755&width=1500'
    },
    {
        id: 'cat-10',
        slug: 'solusyonlar',
        name: 'Solüsyonlar',
        image: 'https://www.dndgel.com/cdn/shop/collections/resize_dnd_free_spirit-_copy.jpg?v=1717011974'
    },
    {
        id: 'cat-11',
        slug: 'setler',
        name: 'Setler',
        image: 'https://www.dndgel.com/cdn/shop/collections/resize_dnd_free_spirit-_copy.jpg?v=1717011974'
    }
]

export function getCategoryBySlug(slug: string): Category | undefined {
    return categories.find(p => p.slug === slug)
}

export function getCategoryById(id: string): Category | undefined {
    return categories.find(p => p.id === id)
}
