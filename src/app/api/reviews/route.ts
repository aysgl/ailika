import {NextResponse} from 'next/server'

type Review = {
    id: string
    productId: string
    productName: string
    productImage?: string
    rating: number
    comment: string
    date: string // ISO
}

export async function GET() {
    // Mock veriler (ileride DB/servis ile değişecek)
    const mock: Review[] = [
        {
            id: 'R-1',
            productId: '1',
            productName: 'Ailika Premium Kalıcı Oje 15ml',
            productImage:
                'https://www.ellisan.com/wp-content/uploads/2025/04/AilikaKaliciOje-768x768.webp',
            rating: 5,
            comment: 'Rengi ve kalıcılığı harika, tavsiye ederim.',
            date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString()
        },
        {
            id: 'R-2',
            productId: '5',
            productName: 'Borthe Premium Kalıcı Oje 12ml No:002',
            productImage:
                'https://www.ellisan.com/wp-content/uploads/2024/02/002-768x768.webp',
            rating: 4,
            comment: 'Fırçası güzel, tek katta bile kapatıyor.',
            date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString()
        }
    ]

    return NextResponse.json({reviews: mock})
}
