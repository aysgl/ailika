import {NextResponse} from 'next/server'
import {heroSlides} from '../../../lib/heroSlides'

export async function GET() {
    return NextResponse.json(heroSlides)
}
