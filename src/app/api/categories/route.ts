import {NextResponse} from 'next/server'
import {categories} from '@/lib/categories'

export async function GET() {
    try {
        return NextResponse.json({
            success: true,
            data: categories
        })
    } catch (error) {
        console.error('Categories fetch error:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch categories'
            },
            {status: 500}
        )
    }
}
