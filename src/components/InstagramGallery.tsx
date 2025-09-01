'use client'

import {useEffect, useState} from 'react'
// Using native img to avoid remote host whitelist issues for Instagram CDN
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

    if (loading)
        return <div className="text-sm text-foreground-500">Yükleniyor…</div>
    if (items.length === 0) return null

    // Build responsive grid classes based on requested columns (1..6)
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

    return (
        <div className={`grid ${gridClasses} gap-3`}>
            {items.map(item => (
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
                        className="object-cover w-full h-auto"
                    />
                </Link>
            ))}
        </div>
    )
}
