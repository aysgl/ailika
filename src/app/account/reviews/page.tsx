'use client'

import AccountLayout from '@/components/AccountLayout'
import EmptyState from '@/components/EmptyState'
import {Button} from '@/components/ui/button'
import {MessageCircle} from 'lucide-react'
import Link from 'next/link'
import {useEffect, useState} from 'react'
import Image from 'next/image'

export default function ReviewsPage() {
    const [loading, setLoading] = useState(true)
    const [reviews, setReviews] = useState<ReviewUI[]>([])

    useEffect(() => {
        ;(async () => {
            try {
                const res = await fetch('/api/reviews', {cache: 'no-store'})
                const data = await res.json()
                if (Array.isArray(data?.reviews)) {
                    setReviews(
                        data.reviews.map((r: ReviewUI) => ({
                            id: String(r.id),
                            productName: String(r.productName || ''),
                            productImage: String(r.productImage || ''),
                            rating: Number(r.rating || 0),
                            comment: String(r.comment || ''),
                            date: new Date(r.date || Date.now())
                        }))
                    )
                }
            } catch {}
            setLoading(false)
        })()
    }, [])

    return (
        <AccountLayout
            title="Değerlendirmelerim"
            breadcrumb={[
                {label: 'Anasayfa', href: '/'},
                {label: 'Hesabım', href: '/account'},
                {label: 'Değerlendirmelerim'}
            ]}>
            {loading ? (
                <div className="bg-white/40 p-12 rounded-lg">Yükleniyor…</div>
            ) : reviews.length === 0 ? (
                <div className="bg-white/40 p-12 rounded-lg">
                    <EmptyState
                        icon={
                            <MessageCircle className="w-10 h-10 text-primary" />
                        }
                        title="Henüz değerlendirmeniz yok"
                        description="Siparişlerinizdeki ürünleri değerlendirerek puan ve yorum yapabilirsiniz."
                        action={
                            <Link href="/account/orders">
                                <Button>Siparişlerinizi Görüntüle</Button>
                            </Link>
                        }
                    />
                </div>
            ) : (
                <div className="grid gap-3">
                    {reviews.map(r => (
                        <div
                            key={r.id}
                            className="bg-white rounded-xl p-4 flex gap-3 items-start">
                            {r.productImage ? (
                                <Image
                                    src={r.productImage}
                                    alt={r.productName}
                                    width={48}
                                    height={48}
                                    className="w-12 h-12 rounded-full object-cover border"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded bg-muted" />
                            )}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="font-medium line-clamp-1">
                                        {r.productName}
                                    </div>
                                    <div className="text-xs text-foreground/60 whitespace-nowrap">
                                        {r.date.toLocaleDateString('tr-TR')}
                                    </div>
                                </div>
                                <Stars rating={r.rating} />
                                <div className="text-sm text-foreground/80 mt-1 whitespace-pre-line">
                                    {r.comment}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AccountLayout>
    )
}

type ReviewUI = {
    id: string
    productName: string
    productImage?: string
    rating: number
    comment: string
    date: Date
}

function Stars({rating}: {rating: number}) {
    const r = Math.max(0, Math.min(5, Math.round(rating)))
    return (
        <div className="text-amber-500 text-sm" aria-label={`Puan: ${r}/5`}>
            {'★★★★★☆☆☆☆☆'.slice(5 - r, 10 - r)}
        </div>
    )
}
