import {NextResponse} from 'next/server'
import {getProductBySlug} from '../../../../lib/products'

export async function GET(
    request: Request,
    {params}: {params: Promise<{slug: string}>}
) {
    try {
        const {slug} = await params

        if (!slug) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Product slug is required'
                },
                {status: 400}
            )
        }

        const product = getProductBySlug(slug)

        if (!product) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Product not found'
                },
                {status: 404}
            )
        }

        return NextResponse.json({
            success: true,
            data: product
        })
    } catch (error) {
        console.error('Product fetch error:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch product'
            },
            {status: 500}
        )
    }
}
