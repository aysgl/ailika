'use client'

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import {Copy, Check} from 'lucide-react'
import {useState} from 'react'

type CouponCardProps = {
    title: string
    code: string
    description?: string
    discountType: 'percent' | 'amount'
    discountValue: number
    expiresAt?: string
    minSpend?: number
    status?: 'active' | 'used' | 'expired'
    className?: string
}

export default function CouponCard({
    title,
    code,
    description,
    discountType,
    discountValue,
    expiresAt,
    minSpend,
    status = 'active',
    className = ''
}: CouponCardProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error('Failed to copy:', error)
            }
        }
    }

    const formatDate = (iso: string) => {
        try {
            const d = new Date(iso)
            return d.toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'short',
                day: '2-digit'
            })
        } catch {
            return iso
        }
    }

    const formatAmount = (amount: number) => {
        return amount.toLocaleString('tr-TR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
    }

    const getStatusBadge = () => {
        switch (status) {
            case 'used':
                return <Badge variant="outline">Kullanıldı</Badge>
            case 'expired':
                return <Badge variant="destructive">Süresi Doldu</Badge>
            default:
                return <Badge variant="secondary">Aktif</Badge>
        }
    }

    return (
        <Card
            className={`relative overflow-hidden ${
                status === 'expired' ? 'opacity-50' : 'bg-white'
            } ${className}`}>
            <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                    <CardTitle className="font-semibold">{title}</CardTitle>
                    {getStatusBadge()}
                </div>
                {description && (
                    <p className="text-sm text-muted-foreground">
                        {description}
                    </p>
                )}
            </CardHeader>

            <CardContent className="pt-0">
                <div className="relative flex flex-col md:flex-row items-stretch gap-4">
                    <div className="flex items-center justify-between gap-4 mt-6 w-full">
                        {/* Discount Details */}
                        <div className="text-sm text-muted-foreground">
                            <div className="text-foreground">
                                {discountType === 'percent' ? (
                                    <span>İndirim: %{discountValue}</span>
                                ) : (
                                    <span>
                                        İndirim: ₺{formatAmount(discountValue)}
                                    </span>
                                )}
                                {typeof minSpend === 'number' && (
                                    <div>
                                        Min. sepet ₺{formatAmount(minSpend)}
                                    </div>
                                )}
                            </div>
                            <div>
                                {expiresAt ? (
                                    <span>
                                        Son gün: {formatDate(expiresAt)}
                                    </span>
                                ) : (
                                    <span>Süresiz</span>
                                )}
                            </div>
                        </div>

                        {/* Coupon Code Section */}
                        <div className="md:w-46">
                            <div className="flex justify-center border-2 border-dashed border-muted rounded-lg py-2 mb-2 bg-muted/10">
                                <Button
                                    size="lg"
                                    variant="ghost"
                                    onClick={handleCopy}
                                    disabled={
                                        status === 'expired' ||
                                        status === 'used'
                                    }
                                    className="h-10 bg-transparent">
                                    {copied ? (
                                        <>
                                            {code}
                                            <Check className="w-3 h-3 mr-1" />
                                        </>
                                    ) : (
                                        <>
                                            {code}
                                            <Copy className="w-3 h-3 mr-1" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Coupon Cutout Circles */}
                    <div
                        className="absolute -left-6 top-0 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-primary/10 border-2 border-primary"
                        aria-hidden="true"
                    />
                    <div className="absolute right-0 left-0 border border-primary border-dashed"></div>
                    <div
                        className="absolute -right-6 top-0 -translate-y-1/2 translate-x-1/2 w-6 h-6 rounded-full bg-primary/10 border-2 border-primary"
                        aria-hidden="true"
                    />
                </div>
            </CardContent>
        </Card>
    )
}
