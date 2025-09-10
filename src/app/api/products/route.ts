import {NextResponse} from 'next/server'
import {products} from '../../../lib/products'

export async function GET() {
    try {
        return NextResponse.json({
            success: true,
            data: products
        })
    } catch (error) {
        console.error('Products fetch error:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch products'
            },
            {status: 500}
        )
    }
}
