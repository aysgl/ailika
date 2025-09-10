import {NextRequest, NextResponse} from 'next/server'

export async function GET(
    request: NextRequest,
    {params}: {params: {slug: string}}
) {
    const {slug} = params

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
