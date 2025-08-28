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

export default function InstagramGallery({limit = 9}: {limit?: number}) {
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

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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
