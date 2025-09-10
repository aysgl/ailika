import {getCategoryBySlug} from '@/lib/categories'
import {NextResponse} from 'next/server'

export async function GET(
    request: Request,
    {params}: {params: {slug: string}}
) {
    const {slug} = params
    if (!slug) {
        return NextResponse.json(
            {success: false, error: 'Category slug is required'},
            {status: 400}
        )
    }

    const category = getCategoryBySlug(slug)
    if (!category) {
        return NextResponse.json(
            {success: false, error: 'Category not found'},
            {status: 404}
        )
    }

    return NextResponse.json({success: true, data: category})
}
