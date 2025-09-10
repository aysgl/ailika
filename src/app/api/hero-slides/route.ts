import {NextResponse} from 'next/server'
import type {HeroSlide} from '@/types'

// In-memory storage for demo (production'da database kullanın)
const heroSlides: HeroSlide[] = [
    {
        id: 's1',
        title: 'Beauty Inspired by Real Life',
        description: 'Chip Free • Vegan • 21 Days',
        image: '/images/hero-slider/nail-polish.png',
        badgeImage: '/images/hero-slider/badge.png',
        ctaLabel: 'View All Product',
        ctaHref: '/shop',
        texts: [
            'Chip Free',
            "Doesn't Shrink",
            'Cruelty-Free',
            'Vegan',
            'Lasts 21 Days'
        ]
    },
    {
        id: 's2',
        title: '$5 Gel Polish + 25% Off Sitewide',
        description:
            'Just choose the "gel polish only" option. 25% off already applied on everything else, no code needed.',
        image: '/images/hero-slider/nail-polish-2.png',
        badgeImage: '/images/hero-slider/badge.png',
        ctaLabel: 'Hemen İncele',
        ctaHref: '/product/klasik-kirmizi-oje',
        texts: ['Parlak Kırmızı', 'Yoğun Kapatıcılık', 'Hızlı Kurur']
    }
]

export async function GET() {
    try {
        return NextResponse.json({
            success: true,
            data: heroSlides
        })
    } catch (error) {
        console.error('Hero slides fetch error:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch hero slides'
            },
            {status: 500}
        )
    }
}
