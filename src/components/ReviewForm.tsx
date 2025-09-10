'use client'

import {useState} from 'react'
import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Textarea} from '@/components/ui/textarea'
import {Star, Send, Heart} from 'lucide-react'
import {cn} from '@/lib/utils'
import {useAuth} from '@/context/AuthContext'

interface ReviewFormProps {
    productId: string
    productName: string
    onReviewSubmitted?: (review: {
        rating: number
        comment: string
        productName: string
        date: Date
    }) => void
}

export default function ReviewForm({
    productId,
    productName,
    onReviewSubmitted
}: ReviewFormProps) {
    const {user, isAuthenticated} = useAuth()
    const [rating, setRating] = useState(0)
    const [hoveredRating, setHoveredRating] = useState(0)
    const [comment, setComment] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!isAuthenticated || !user) {
            return
        }

        if (rating === 0) {
            alert('Lütfen bir puan verin')
            return
        }

        if (comment.trim().length < 10) {
            alert('Yorumunuz en az 10 karakter olmalıdır')
            return
        }

        setIsSubmitting(true)

        try {
            // API'ye gönder
            const response = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productId,
                    productName,
                    rating,
                    comment: comment.trim(),
                    userId: user.email // Demo için email kullanıyoruz
                })
            })

            if (response.ok) {
                const newReview = {
                    rating,
                    comment: comment.trim(),
                    productName,
                    date: new Date()
                }

                onReviewSubmitted?.(newReview)
                setSubmitted(true)
                setRating(0)
                setComment('')
            } else {
                throw new Error('Yorum gönderilemedi')
            }
        } catch (error) {
            console.error('Review submission error:', error)
            alert('Yorum gönderilirken bir hata oluştu')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!isAuthenticated) {
        return (
            <Card className="shadow-none">
                <CardContent className="p-6 text-center">
                    <div className="flex flex-col items-center gap-4">
                        <Star className="w-8 h-8 text-primary/60" />
                        <div>
                            <h3 className="font-semibold text-lg mb-2">
                                Yorum yapmak için giriş yapın
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Bu ürün hakkında deneyimlerinizi paylaşın
                            </p>
                            <div className="flex gap-2 justify-center">
                                <Button asChild variant="outline" size="sm">
                                    <Link href="/login">Giriş Yap</Link>
                                </Button>
                                <Button asChild size="sm">
                                    <Link href="/register">Kayıt Ol</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (submitted) {
        return (
            <Card className="shadow-none">
                <CardContent className="p-6 text-center">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <Send className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-semibold">Yorumunuz gönderildi!</h3>
                        <p className="text-sm">
                            Teşekkürler! Yorumunuz onaylandıktan sonra
                            yayınlanacaktır.
                        </p>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSubmitted(false)}
                            className="mt-2">
                            Yeni Yorum Yaz
                        </Button>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="bg-white border-primary/20">
            <CardHeader>
                <CardTitle className="font-semibold text-lg mb-2">
                    Ürün Yorumu Yaz
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                        &quot;{productName}&quot;
                    </span>{' '}
                    hakkında deneyimlerinizi paylaşın
                </p>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Rating Stars */}
                    <div>
                        <label className="text-sm font-medium mb-2 block">
                            Puanınız
                        </label>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map(star => (
                                <button
                                    key={star}
                                    type="button"
                                    className="p-1 rounded hover:bg-primary/10 transition-colors"
                                    onMouseEnter={() => setHoveredRating(star)}
                                    onMouseLeave={() => setHoveredRating(0)}
                                    onClick={() => setRating(star)}>
                                    <Heart
                                        className={cn(
                                            'w-6 h-6 transition-colors',
                                            hoveredRating >= star ||
                                                rating >= star
                                                ? 'fill-secondary text-secondary'
                                                : 'text-gray-300'
                                        )}
                                    />
                                </button>
                            ))}
                            {rating > 0 && (
                                <p className="text-xs text-muted-foreground ms-2">
                                    {rating === 1 && 'Çok kötü'}
                                    {rating === 2 && 'Kötü'}
                                    {rating === 3 && 'Orta'}
                                    {rating === 4 && 'İyi'}
                                    {rating === 5 && 'Mükemmel'}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Comment */}
                    <div>
                        <label className="text-sm font-medium mb-2 block">
                            Yorumunuz
                        </label>
                        <Textarea
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            placeholder="Bu ürün hakkında düşüncelerinizi yazın..."
                            rows={4}
                            className="resize-none"
                            maxLength={500}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                            {comment.length}/500 karakter (min. 10)
                        </p>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-2">
                        <Button variant="outline">Vazgeç</Button>
                        <Button
                            type="submit"
                            variant="secondary"
                            disabled={
                                isSubmitting ||
                                rating === 0 ||
                                comment.trim().length < 10
                            }>
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                    Gönderiliyor...
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4 mr-2" />
                                    Yorumu Gönder
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
