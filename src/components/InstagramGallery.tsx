'use client'

import {useEffect, useState, useMemo} from 'react'
import Link from 'next/link'

type IGItem = {
    id: string
    url: string
    link: string
    caption: string
}

export default function InstagramGallery({
    limit = 9,
    cols = 3
}: {
    limit?: number
    cols?: number
}) {
    const [items, setItems] = useState<IGItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`/api/instagram?limit=${limit}`)
            .then(r => r.json())
            .then(d => setItems(d.items || []))
            .catch(() => setItems([]))
            .finally(() => setLoading(false))
    }, [limit])

    const c = Math.min(6, Math.max(1, cols))
    const classMap: Record<number, string> = {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-2 md:grid-cols-3',
        4: 'grid-cols-2 md:grid-cols-4',
        5: 'grid-cols-2 md:grid-cols-5',
        6: 'grid-cols-2 md:grid-cols-6'
    }
    const gridClasses = classMap[c]

    // --- SKELETON HAZIRLAMA ---
    const skeletonItems = useMemo(
        () =>
            Array.from({length: limit}).map((_, i) => (
                <div
                    key={`skeleton-${i}`}
                    className="w-full aspect-3/4 bg-white/40/70 rounded-xl animate-pulse"
                />
            )),
        [limit]
    )

    if (loading) {
        return (
            <div className={`grid ${gridClasses} gap-3`}>{skeletonItems}</div>
        )
    }

    if (items.length === 0) return null

    // Banner'ı rastgele bir pozisyona ekle
    const bannerIndex = Math.floor(Math.random() * items.length)

    const galleryItems: React.ReactNode[] = items.reduce<React.ReactNode[]>(
        (acc, item, i) => {
            acc.push(
                <Link
                    key={item.id}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block w-full overflow-hidden rounded-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={item.url}
                        alt={item.caption || 'Instagram'}
                        className="object-cover w-full h-full"
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                    />
                </Link>
            )

            if (i === bannerIndex) {
                acc.push(
                    <div
                        key="banner"
                        className="w-full h-full bg-gradient-to-r from-primary to-primary/60 
                               flex items-center justify-center rounded-xl text-white font-bold text-lg">
                        Banner Alanı
                    </div>
                )
            }

            return acc
        },
        []
    )

    return <div className={`grid ${gridClasses} gap-3`}>{galleryItems}</div>
}
