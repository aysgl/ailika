import {NextRequest, NextResponse} from 'next/server'

export async function GET(
    request: NextRequest,
    context: {params: Promise<{slug: string}>}
) {
    const {slug} = await context.params

    try {
        return NextResponse.json({success: true, data: {slug}})
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {success: false, error: 'Something went wrong'},
            {status: 500}
        )
    }
}
