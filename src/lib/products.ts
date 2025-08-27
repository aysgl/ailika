import {Product} from '../types/product'

export const products: Product[] = [
    {
        id: '1',
        name: 'Ailika Premium Kalıcı Oje 15ml',
        slug: 'klasik-kirmizi-oje',
        price: 1299,
        oldPrice: 1599,
        description: 'Parlak bitişli, hızlı kuruyan klasik kırmızı oje.',
        image: 'https://www.ellisan.com/wp-content/uploads/2025/04/AilikaKaliciOje-768x768.webp',
        colors: ['#ffffff00']
    },
    {
        id: '2',
        name: 'Ailika Premium Kedigözü Oje 15ml CatEye',
        slug: 'pastel-pembe-oje',
        price: 1199,
        oldPrice: 1499,
        description:
            'Yumuşak tonlarda günlük kullanım için ideal pastel pembe.',
        image: 'https://www.ellisan.com/wp-content/uploads/2025/04/Cateye_Oje-768x768.webp',
        colors: ['#990315']
    },
    {
        id: '4',
        name: 'Borthe Premium Kalıcı Oje 12ml No:001',
        slug: 'klasik-kirmizi-oje',
        price: 1299,
        description: 'Parlak bitişli, hızlı kuruyan klasik kırmızı oje.',
        image: 'https://www.ellisan.com/wp-content/uploads/2024/02/001-768x768.webp',
        colors: ['#e5efea']
    },
    {
        id: '5',
        name: 'Borthe Premium Kalıcı Oje 12ml No:002',
        slug: 'pastel-pembe-oje',
        price: 1199,
        description:
            'Yumuşak tonlarda günlük kullanım için ideal pastel pembe.',
        image: 'https://www.ellisan.com/wp-content/uploads/2024/02/002-768x768.webp',
        colors: ['#f3efdd']
    },
    {
        id: '6',
        name: 'Borthe Premium Kalıcı Oje 12ml No:003',
        slug: 'nude-bej-oje',
        price: 1399,
        oldPrice: 1699,
        description: 'Doğal ve şık görünüm için nude bej ton.',
        image: 'https://www.ellisan.com/wp-content/uploads/2024/02/003-768x768.webp',
        colors: ['rgb(245 227 218)']
    },
    {
        id: '7',
        name: 'Borthe Premium Kalıcı Oje 12ml No:004',
        slug: 'klasik-kirmizi-oje',
        price: 1299,
        oldPrice: 1499,
        description: 'Parlak bitişli, hızlı kuruyan klasik kırmızı oje.',
        image: 'https://www.ellisan.com/wp-content/uploads/2024/02/004-768x768.webp',
        colors: ['rgb(243 178 178)']
    },
    {
        id: '8',
        name: 'Borthe Premium Kalıcı Oje 12ml No:005',
        slug: 'pastel-pembe-oje',
        price: 1199,
        description:
            'Yumuşak tonlarda günlük kullanım için ideal pastel pembe.',
        image: 'https://www.ellisan.com/wp-content/uploads/2024/02/005-768x768.webp',
        colors: ['rgb(255 219 224)']
    },
    {
        id: '9',
        name: 'Borthe Premium Kalıcı Oje 12ml No:006',
        slug: 'nude-bej-oje',
        price: 1399,
        description: 'Doğal ve şık görünüm için nude bej ton.',
        image: 'https://www.ellisan.com/wp-content/uploads/2024/02/006-768x768.webp',
        colors: ['rgb(254 222 211)']
    },
    {
        id: '10',
        name: 'Borthe Premium Kalıcı Oje 12ml No:007',
        slug: 'klasik-kirmizi-oje',
        price: 1299,
        description: 'Parlak bitişli, hızlı kuruyan klasik kırmızı oje.',
        image: 'https://www.ellisan.com/wp-content/uploads/2024/02/007-768x768.webp',
        colors: ['rgb(255 195 170)']
    },
    {
        id: '11',
        name: 'Borthe Premium Kalıcı Oje 12ml No:008',
        slug: 'pastel-pembe-oje',
        price: 1199,
        description:
            'Yumuşak tonlarda günlük kullanım için ideal pastel pembe.',
        image: 'https://www.ellisan.com/wp-content/uploads/2024/02/008-768x768.webp',
        colors: ['rgb(254 199 179)']
    },
    {
        id: '12',
        name: 'Borthe Premium Kalıcı Oje 12ml No:009',
        slug: 'nude-bej-oje',
        price: 1399,
        description: 'Doğal ve şık görünüm için nude bej ton.',
        image: 'https://www.ellisan.com/wp-content/uploads/2024/02/009-768x768.webp',
        colors: ['rgb(251 184 159)']
    },
    {
        id: '3',
        name: 'Borthe Premium Kalıcı Oje 12ml No:010',
        slug: 'nude-bej-oje',
        price: 1399,
        description: 'Doğal ve şık görünüm için nude bej ton.',
        image: 'https://www.ellisan.com/wp-content/uploads/2024/02/010-768x768.webp',
        colors: ['rgb(250 168 134)']
    }
]

export function getProductBySlug(slug: string): Product | undefined {
    return products.find(p => p.slug === slug)
}

export function getProductById(id: string): Product | undefined {
    return products.find(p => p.id === id)
}
