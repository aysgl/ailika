import {NextResponse} from 'next/server'

type Review = {
    id: string
    productId: string
    productName: string
    productImage?: string
    rating: number
    comment: string
    date: string // ISO
    userId?: string
}

// In-memory storage for demo (production'da database kullanın)
const reviewsStorage: Review[] = [
    {
        id: 'R-1',
        productId: '1',
        productName: 'Ailika Premium Kalıcı Oje 15ml',
        productImage:
            'https://www.ellisan.com/wp-content/uploads/2025/04/AilikaKaliciOje-768x768.webp',
        rating: 5,
        comment: 'Rengi ve kalıcılığı harika, tavsiye ederim.',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
        userId: 'demo@user.com'
    },
    {
        id: 'R-2',
        productId: '5',
        productName: 'Borthe Premium Kalıcı Oje 12ml No:002',
        productImage:
            'https://www.ellisan.com/wp-content/uploads/2024/02/002-768x768.webp',
        rating: 4,
        comment: 'Fırçası güzel, tek katta bile kapatıyor.',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
        userId: 'demo2@user.com'
    }
]

export async function GET() {
    return NextResponse.json({reviews: reviewsStorage})
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const {productId, productName, rating, comment, userId} = body

        // Validation
        if (!productId || !productName || !rating || !comment || !userId) {
            return NextResponse.json(
                {error: 'Missing required fields'},
                {status: 400}
            )
        }

        if (rating < 1 || rating > 5) {
            return NextResponse.json(
                {error: 'Rating must be between 1 and 5'},
                {status: 400}
            )
        }

        if (comment.trim().length < 10) {
            return NextResponse.json(
                {error: 'Comment must be at least 10 characters'},
                {status: 400}
            )
        }

        // Create new review
        const newReview: Review = {
            id: `R-${Date.now()}`,
            productId,
            productName,
            rating: Number(rating),
            comment: comment.trim(),
            date: new Date().toISOString(),
            userId
        }

        // Add to storage
        reviewsStorage.push(newReview)

        return NextResponse.json({
            success: true,
            review: newReview
        })
    } catch (error) {
        console.error('Review POST error:', error)
        return NextResponse.json(
            {error: 'Internal server error'},
            {status: 500}
        )
    }
}
