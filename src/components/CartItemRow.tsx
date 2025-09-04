'use client'

import Image from 'next/image'
import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {Trash} from 'lucide-react'
import QuantityControl from './QuantityControl'

type Props = {
    slug: string
    name: string
    code?: string
    image?: string
    priceCents: number
    quantity: number
    onIncrease: () => void
    onDecrease: () => void
    onRemove: () => void
    formatCents: (cents: number) => string
    onNavigate?: () => void
}

export default function CartItemRow({
    slug,
    name,
    code,
    image,
    priceCents,
    quantity,
    onIncrease,
    onDecrease,
    onRemove,
    formatCents,
    onNavigate
}: Props) {
    return (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-12 sm:items-center sm:justify-between p-3 sm:p-4">
            {/* Mobile: Stacked layout, Desktop: Horizontal */}
            <div className="flex items-center gap-2 sm:w-1/2">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onRemove}
                    className="text-primary hover:text-foreground-900 shrink-0">
                    <Trash className="w-4 h-4" />
                </Button>
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 overflow-hidden rounded-xl bg-foreground-100 shadow-xl aspect-square">
                    <Image
                        src={image || '/next.svg'}
                        alt={name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <Link
                        href={`/product/${slug}`}
                        onClick={onNavigate}
                        className="font-medium hover:underline text-sm sm:text-base line-clamp-2 sm:line-clamp-1">
                        {name}
                    </Link>
                    {code && (
                        <p className="text-xs sm:text-sm text-foreground-500">
                            Code: {code}
                        </p>
                    )}
                </div>
            </div>

            {/* Mobile: Bottom row with quantity and price */}
            <div className="flex items-center justify-end gap-3 sm:gap-4">
                <QuantityControl
                    size="sm"
                    quantity={quantity}
                    onIncrease={onIncrease}
                    onDecrease={onDecrease}
                />

                <div className="min-w-20 text-end">
                    <span className="text-lg sm:text-xl font-semibold">
                        {formatCents(priceCents * quantity)}
                    </span>
                </div>
            </div>
        </div>
    )
}
