import {Product} from '../types/product'

export const products: Product[] = [
    {
        id: '1',
        name: 'Klasik Kırmızı Oje',
        slug: 'klasik-kirmizi-oje',
        price: 1299,
        oldPrice: 1599,
        description: 'Parlak bitişli, hızlı kuruyan klasik kırmızı oje.',
        image: 'https://pastelshop.com/pastel-oje-446-summer-collection-aura-2025-pastel-9194-12-K.jpg',
        colors: ['#C21807']
    },
    {
        id: '2',
        name: 'Pastel Pembe Oje',
        slug: 'pastel-pembe-oje',
        price: 1199,
        oldPrice: 1499,
        description:
            'Yumuşak tonlarda günlük kullanım için ideal pastel pembe.',
        image: 'https://pastelshop.com/pastel-oje-445-summer-collection-aura-2025-pastel-9189-12-K.jpg',
        colors: ['#F8BBD0']
    },
    {
        id: '3',
        name: 'Nude Bej Oje',
        slug: 'nude-bej-oje',
        price: 1399,
        description: 'Doğal ve şık görünüm için nude bej ton.',
        image: 'https://pastelshop.com/pastel-oje-445-summer-collection-aura-2025-pastel-9191-12-K.jpg',
        colors: ['#D7CCC8']
    },
    {
        id: '4',
        name: 'Klasik Kırmızı Oje',
        slug: 'klasik-kirmizi-oje',
        price: 1299,
        description: 'Parlak bitişli, hızlı kuruyan klasik kırmızı oje.',
        image: 'https://pastelshop.com/pastel-oje-445-summer-collection-aura-2025-pastel-9192-12-K.jpg',
        colors: ['#C21807']
    },
    {
        id: '5',
        name: 'Pastel Pembe Oje',
        slug: 'pastel-pembe-oje',
        price: 1199,
        description:
            'Yumuşak tonlarda günlük kullanım için ideal pastel pembe.',
        image: 'https://pastelshop.com/pastel-oje-445-summer-collection-aura-2025-pastel-9193-12-K.jpg',
        colors: ['#F8BBD0']
    },
    {
        id: '6',
        name: 'Nude Bej Oje',
        slug: 'nude-bej-oje',
        price: 1399,
        oldPrice: 1699,
        description: 'Doğal ve şık görünüm için nude bej ton.',
        image: 'https://pastelshop.com/pastel-oje-445-summer-collection-aura-2025-pastel-9194-12-K.jpg',
        colors: ['#D7CCC8']
    },
    {
        id: '7',
        name: 'Klasik Kırmızı Oje',
        slug: 'klasik-kirmizi-oje',
        price: 1299,
        oldPrice: 1499,
        description: 'Parlak bitişli, hızlı kuruyan klasik kırmızı oje.',
        image: 'https://pastelshop.com/pastel-oje-445-summer-collection-aura-2025-pastel-9181-12-K.jpg',
        colors: ['#C21807']
    },
    {
        id: '8',
        name: 'Pastel Pembe Oje',
        slug: 'pastel-pembe-oje',
        price: 1199,
        description:
            'Yumuşak tonlarda günlük kullanım için ideal pastel pembe.',
        image: 'https://pastelshop.com/pastel-oje-445-summer-collection-aura-2025-pastel-9182-12-K.jpg',
        colors: ['#F8BBD0']
    },
    {
        id: '9',
        name: 'Nude Bej Oje',
        slug: 'nude-bej-oje',
        price: 1399,
        description: 'Doğal ve şık görünüm için nude bej ton.',
        image: 'https://pastelshop.com/pastel-oje-445-summer-collection-aura-2025-pastel-9183-12-K.jpg',
        colors: ['#D7CCC8']
    },
    {
        id: '10',
        name: 'Klasik Kırmızı Oje',
        slug: 'klasik-kirmizi-oje',
        price: 1299,
        description: 'Parlak bitişli, hızlı kuruyan klasik kırmızı oje.',
        image: 'https://pastelshop.com/pastel-oje-445-summer-collection-aura-2025-pastel-9184-12-K.jpg',
        colors: ['#C21807']
    },
    {
        id: '11',
        name: 'Pastel Pembe Oje',
        slug: 'pastel-pembe-oje',
        price: 1199,
        description:
            'Yumuşak tonlarda günlük kullanım için ideal pastel pembe.',
        image: 'https://pastelshop.com/pastel-oje-445-summer-collection-aura-2025-pastel-9185-12-K.jpg',
        colors: ['#F8BBD0']
    },
    {
        id: '12',
        name: 'Nude Bej Oje',
        slug: 'nude-bej-oje',
        price: 1399,
        description: 'Doğal ve şık görünüm için nude bej ton.',
        image: 'https://pastelshop.com/pastel-oje-445-summer-collection-aura-2025-pastel-9186-12-K.jpg',
        colors: ['#D7CCC8']
    }
]

export function getProductBySlug(slug: string): Product | undefined {
    return products.find(p => p.slug === slug)
}

export function getProductById(id: string): Product | undefined {
    return products.find(p => p.id === id)
}
